using System.Linq.Expressions;
using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;
using ExpenseTracker.Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _db;

    public TransactionService(AppDbContext db)
    {
        _db = db;
    }

    // One mapping used everywhere. The Expression version is translated to SQL
    // (so we only select the columns we need); the compiled Func is for objects already in memory.
    private static readonly Expression<Func<Transaction, TransactionDto>> ToDtoExpression = t => new TransactionDto
    {
        Id = t.Id,
        Type = t.Type,
        Amount = t.Amount,
        Date = t.Date,
        Note = t.Note,
        CategoryId = t.CategoryId,
        CategoryName = t.Category.Name,
        CategoryColor = t.Category.Color,
        CreatedAt = t.CreatedAt,
        UpdatedAt = t.UpdatedAt
    };

    private static readonly Func<Transaction, TransactionDto> ToDto = ToDtoExpression.Compile();

    public async Task<PagedResult<TransactionDto>> GetAllAsync(int userId, TransactionQuery query)
    {
        if (query.From.HasValue && query.To.HasValue && query.From > query.To)
            throw new BadRequestException("'from' must not be later than 'to'.");

        var sortBy = (query.SortBy ?? "date").Trim().ToLowerInvariant();
        var sortDir = (query.SortDir ?? "desc").Trim().ToLowerInvariant();

        if (sortBy is not ("date" or "amount" or "createdat"))
            throw new BadRequestException("sortBy must be one of: date, amount, createdAt.");
        if (sortDir is not ("asc" or "desc"))
            throw new BadRequestException("sortDir must be 'asc' or 'desc'.");

        // 1) Always scope to the current user first
        var q = _db.Transactions
            .AsNoTracking()
            .Where(t => t.UserId == userId);

        // 2) Optional filters (all translated to SQL)
        if (query.Type.HasValue)
            q = q.Where(t => t.Type == query.Type.Value);

        if (query.CategoryId.HasValue)
            q = q.Where(t => t.CategoryId == query.CategoryId.Value);

        if (query.From.HasValue)
            q = q.Where(t => t.Date >= query.From.Value);

        if (query.To.HasValue)
            q = q.Where(t => t.Date <= query.To.Value);

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();
            q = q.Where(t => t.Note != null && t.Note.Contains(search));
        }

        // 3) Count BEFORE paging
        var totalCount = await q.CountAsync();

        // 4) Sorting (whitelist). Id is the tie-breaker so paging is stable.
        var desc = sortDir == "desc";
        IOrderedQueryable<Transaction> ordered = (sortBy, desc) switch
        {
            ("amount", true) => q.OrderByDescending(t => t.Amount).ThenByDescending(t => t.Id),
            ("amount", false) => q.OrderBy(t => t.Amount).ThenBy(t => t.Id),
            ("createdat", true) => q.OrderByDescending(t => t.CreatedAt).ThenByDescending(t => t.Id),
            ("createdat", false) => q.OrderBy(t => t.CreatedAt).ThenBy(t => t.Id),
            (_, true) => q.OrderByDescending(t => t.Date).ThenByDescending(t => t.Id),
            (_, false) => q.OrderBy(t => t.Date).ThenBy(t => t.Id)
        };

        // 5) Paging
        var items = await ordered
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(ToDtoExpression)
            .ToListAsync();

        return new PagedResult<TransactionDto>
        {
            Items = items,
            Page = query.Page,
            PageSize = query.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task<TransactionDto> GetByIdAsync(int userId, int id)
    {
        var dto = await _db.Transactions
            .AsNoTracking()
            .Where(t => t.Id == id && t.UserId == userId)
            .Select(ToDtoExpression)
            .FirstOrDefaultAsync();

        // Not found OR belongs to someone else -> same 404
        return dto ?? throw new NotFoundException("Transaction not found.");
    }

    public async Task<TransactionDto> CreateAsync(int userId, CreateTransactionRequest request)
    {
        var category = await GetUsableCategoryAsync(userId, request.CategoryId, request.Type);

        var transaction = new Transaction
        {
            UserId = userId, // always from the token, never from the request
            Type = request.Type,
            Category = category,
            Amount = request.Amount,
            Date = request.Date!.Value,
            Note = NormalizeNote(request.Note)
        };

        _db.Transactions.Add(transaction);
        await _db.SaveChangesAsync();

        return ToDto(transaction);
    }

    public async Task<TransactionDto> UpdateAsync(int userId, int id, UpdateTransactionRequest request)
    {
        var transaction = await _db.Transactions
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId)
            ?? throw new NotFoundException("Transaction not found.");

        var category = await GetUsableCategoryAsync(userId, request.CategoryId, request.Type);

        transaction.Type = request.Type;
        transaction.Category = category;
        transaction.Amount = request.Amount;
        transaction.Date = request.Date!.Value;
        transaction.Note = NormalizeNote(request.Note);
        transaction.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return ToDto(transaction);
    }

    public async Task DeleteAsync(int userId, int id)
    {
        var transaction = await _db.Transactions
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId)
            ?? throw new NotFoundException("Transaction not found.");

        _db.Transactions.Remove(transaction);
        await _db.SaveChangesAsync();
    }

    // ---------- helpers ----------

    // The category must be a default one or the user's own, and its type must match the transaction type.
    // Someone else's category gets the same message as a missing one, so we don't reveal it exists.
    private async Task<Category> GetUsableCategoryAsync(int userId, int categoryId, TransactionType type)
    {
        var category = await _db.Categories
            .FirstOrDefaultAsync(c => c.Id == categoryId && (c.UserId == null || c.UserId == userId))
            ?? throw new BadRequestException("Category not found.");

        if (category.Type != type)
            throw new BadRequestException(
                $"Category '{category.Name}' is an {category.Type} category and cannot be used for an {type} transaction.");

        return category;
    }

    private static string? NormalizeNote(string? note)
        => string.IsNullOrWhiteSpace(note) ? null : note.Trim();
}