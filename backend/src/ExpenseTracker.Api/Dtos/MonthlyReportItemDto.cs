namespace ExpenseTracker.Api.Dtos;

public class MonthlyReportItemDto
{
    // 1 = January ... 12 = December
    public int Month { get; set; }
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
}