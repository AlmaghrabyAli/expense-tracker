namespace ExpenseTracker.Api.Entities;

public class Category
{
    public int Id { get; set; }

    // null = تصنيف افتراضي مشترك للكل (read-only)
    public int? UserId { get; set; }
    public User? User { get; set; }

    public string Name { get; set; } = string.Empty;
    public TransactionType Type { get; set; }
    public string Color { get; set; } = "#64748B";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}