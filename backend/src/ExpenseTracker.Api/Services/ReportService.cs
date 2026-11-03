using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;
using ExpenseTracker.Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services;

public class ReportService : IReportService
{
    private readonly AppDbContext _db;

    public ReportService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<SummaryDto> GetSummaryAsync(int userId, DateOnly? from, DateOnly? to)
    {
        var query = BuildUserQuery(userId, from, to);

        // One SQL query: total amount and count per type (Income / Expense)
        var groups = await query
            .GroupBy(t => t.Type)
            .Select(g => new
            {
                Type = g.Key,
                Total = g.Sum(t => t.Amount),
                Count = g.Count()
            })
            .ToListAsync();

        // If the user has no data, 'groups' is empty -> we return zeros (not an error)
        var income = groups.FirstOrDefault(g => g.Type == TransactionType.Income)?.Total ?? 0m;
        var expense = groups.FirstOrDefault(g => g.Type == TransactionType.Expense)?.Total ?? 0m;

        return new SummaryDto
        {
            TotalIncome = income,
            TotalExpense = expense,
            Balance = income - expense,
            TransactionCount = groups.Sum(g => g.Count)
        };
    }

    public async Task<List<CategoryTotalDto>> GetByCategoryAsync(
        int userId, TransactionType type, DateOnly? from, DateOnly? to)
    {
        var query = BuildUserQuery(userId, from, to)
            .Where(t => t.Type == type);

        // Group in SQL: one row per category with its total
        var rows = await query
            .GroupBy(t => new { t.CategoryId, t.Category.Name, t.Category.Color })
            .Select(g => new
            {
                g.Key.CategoryId,
                g.Key.Name,
                g.Key.Color,
                Total = g.Sum(t => t.Amount)
            })
            .OrderByDescending(r => r.Total)
            .ThenBy(r => r.Name)
            .ToListAsync();

        var grandTotal = rows.Sum(r => r.Total);

        // The percentage is calculated here (small list, at most a few dozen rows)
        return rows.Select(r => new CategoryTotalDto
        {
            CategoryId = r.CategoryId,
            Name = r.Name,
            Color = r.Color,
            Total = r.Total,
            Percentage = grandTotal == 0 ? 0m : Math.Round(r.Total / grandTotal * 100m, 2)
        }).ToList();
    }

    public async Task<List<MonthlyReportItemDto>> GetMonthlyAsync(int userId, int? year)
    {
        var selectedYear = year ?? DateTime.UtcNow.Year;

        if (selectedYear < 2000 || selectedYear > 2100)
            throw new BadRequestException("year must be between 2000 and 2100.");

        var start = new DateOnly(selectedYear, 1, 1);
        var end = new DateOnly(selectedYear, 12, 31);

        // Group in SQL by (month, type): at most 24 rows come back
        var rows = await BuildUserQuery(userId, start, end)
            .GroupBy(t => new { t.Date.Month, t.Type })
            .Select(g => new
            {
                g.Key.Month,
                g.Key.Type,
                Total = g.Sum(t => t.Amount)
            })
            .ToListAsync();

        // Always return 12 items (1..12), with zeros for months that have no data
        var result = new List<MonthlyReportItemDto>(12);

        for (var month = 1; month <= 12; month++)
        {
            result.Add(new MonthlyReportItemDto
            {
                Month = month,
                Income = rows
                    .Where(r => r.Month == month && r.Type == TransactionType.Income)
                    .Sum(r => r.Total),
                Expense = rows
                    .Where(r => r.Month == month && r.Type == TransactionType.Expense)
                    .Sum(r => r.Total)
            });
        }

        return result;
    }

    // ---------- helpers ----------

    // Always scoped to the current user first, then the optional (inclusive) date range.
    private IQueryable<Transaction> BuildUserQuery(int userId, DateOnly? from, DateOnly? to)
    {
        if (from.HasValue && to.HasValue && from > to)
            throw new BadRequestException("'from' must not be later than 'to'.");

        var query = _db.Transactions
            .AsNoTracking()
            .Where(t => t.UserId == userId);

        if (from.HasValue)
            query = query.Where(t => t.Date >= from.Value);

        if (to.HasValue)
            query = query.Where(t => t.Date <= to.Value);

        return query;
    }
}