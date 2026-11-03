using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;

namespace ExpenseTracker.Api.Services;

public interface IReportService
{
    Task<SummaryDto> GetSummaryAsync(int userId, DateOnly? from, DateOnly? to);
    Task<List<CategoryTotalDto>> GetByCategoryAsync(int userId, TransactionType type, DateOnly? from, DateOnly? to);
    Task<List<MonthlyReportItemDto>> GetMonthlyAsync(int userId, int? year);
}