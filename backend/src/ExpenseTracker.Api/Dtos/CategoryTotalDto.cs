namespace ExpenseTracker.Api.Dtos;

public class CategoryTotalDto
{
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;

    public decimal Total { get; set; }

    // share of this category from the grand total, 0-100, rounded to 2 decimals
    public decimal Percentage { get; set; }
}