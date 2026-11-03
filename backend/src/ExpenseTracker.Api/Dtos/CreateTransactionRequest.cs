using System.ComponentModel.DataAnnotations;
using ExpenseTracker.Api.Entities;
using ExpenseTracker.Api.Validation;

namespace ExpenseTracker.Api.Dtos;

public class CreateTransactionRequest
{
    [EnumDataType(typeof(TransactionType))]
    public TransactionType Type { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "CategoryId is required.")]
    public int CategoryId { get; set; }

    [Range(0.01, 999999999.99)]
    [MaxDecimalPlaces(2)]
    public decimal Amount { get; set; }

    // Nullable + [Required]: so a missing date is rejected instead of silently becoming 0001-01-01
    [Required]
    public DateOnly? Date { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }
}