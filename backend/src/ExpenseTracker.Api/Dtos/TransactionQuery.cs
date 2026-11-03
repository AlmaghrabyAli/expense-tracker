using System.ComponentModel.DataAnnotations;
using ExpenseTracker.Api.Entities;

namespace ExpenseTracker.Api.Dtos;

public class TransactionQuery
{
    public TransactionType? Type { get; set; }
    public int? CategoryId { get; set; }
    public DateOnly? From { get; set; }
    public DateOnly? To { get; set; }
    public string? Search { get; set; }

    // date | amount | createdAt  (checked against a whitelist in the service)
    public string SortBy { get; set; } = "date";

    // asc | desc
    public string SortDir { get; set; } = "desc";

    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
}