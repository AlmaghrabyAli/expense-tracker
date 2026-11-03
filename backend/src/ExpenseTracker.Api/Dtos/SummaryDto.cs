namespace ExpenseTracker.Api.Dtos;

public class SummaryDto
{
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }

    // TotalIncome - TotalExpense (can be negative)
    public decimal Balance { get; set; }

    public int TransactionCount { get; set; }
}