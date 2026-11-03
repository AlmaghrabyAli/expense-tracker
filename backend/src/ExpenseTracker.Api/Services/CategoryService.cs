using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;
using ExpenseTracker.Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _db;

    public CategoryService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CategoryDto>> GetAllAsync(int userId, TransactionType? type)
    {
        // Defaults (UserId == null) + this user's own categories only
        var query = _db.Categories
            .AsNoTracking()
            .Where(c => c.UserId == null || c.UserId == userId);

        if (type.HasValue)
            query = query.Where(c => c.Type == type.Value);

        var categories = await query
            .OrderBy(c => c.Type)
            .ThenBy(c => c.Name)
            .ToListAsync();

        return categories.Select(ToDto).ToList();
    }

    public async Task<CategoryDto> CreateAsync(int userId, CreateCategoryRequest request)
    {
        var name = request.Name.Trim();

        if (await NameExistsAsync(userId, name, request.Type, excludeId: null))
            throw new ConflictException($"A {request.Type} category named '{name}' already exists.");

        var category = new Category
        {
            UserId = userId, // always from the token, never from the request
            Name = name,
            Type = request.Type,
            Color = request.Color
        };

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return ToDto(category);
    }

    public async Task<CategoryDto> UpdateAsync(int userId, int id, UpdateCategoryRequest request)
    {
        var category = await GetEditableCategoryAsync(userId, id);
        var name = request.Name.Trim();

        if (await NameExistsAsync(userId, name, category.Type, excludeId: category.Id))
            throw new ConflictException($"A {category.Type} category named '{name}' already exists.");

        category.Name = name;
        category.Color = request.Color;

        await _db.SaveChangesAsync();

        return ToDto(category);
    }

    public async Task DeleteAsync(int userId, int id)
    {
        var category = await GetEditableCategoryAsync(userId, id);

        var hasTransactions = await _db.Transactions.AnyAsync(t => t.CategoryId == id);
        if (hasTransactions)
            throw new ConflictException(
                "This category has transactions. Move or delete them first, then try again.");

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
    }

    // ---------- helpers ----------

    // Used by update/delete: returns a tracked category the user is allowed to change.
    private async Task<Category> GetEditableCategoryAsync(int userId, int id)
    {
        var category = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id);

        // Not found OR belongs to another user -> same 404 (don't reveal it exists)
        if (category is null || (category.UserId != null && category.UserId != userId))
            throw new NotFoundException("Category not found.");

        if (category.UserId is null)
            throw new ForbiddenException("Default categories cannot be edited or deleted.");

        return category;
    }

    // Duplicate check against the user's own categories AND the defaults.
    // SQL Server's default collation is case-insensitive, so "food" matches "Food".
    private Task<bool> NameExistsAsync(int userId, string name, TransactionType type, int? excludeId)
    {
        return _db.Categories.AnyAsync(c =>
            (c.UserId == null || c.UserId == userId) &&
            c.Type == type &&
            c.Name == name &&
            (excludeId == null || c.Id != excludeId));
    }

    private static CategoryDto ToDto(Category c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        Type = c.Type,
        Color = c.Color,
        IsDefault = c.UserId == null
    };
}