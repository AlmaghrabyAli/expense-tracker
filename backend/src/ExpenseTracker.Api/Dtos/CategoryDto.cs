using ExpenseTracker.Api.Entities;

namespace ExpenseTracker.Api.Dtos;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public TransactionType Type { get; set; }
    public string Color { get; set; } = string.Empty;

    // true = default category (UserId == null): read-only for everyone
    public bool IsDefault { get; set; }
}