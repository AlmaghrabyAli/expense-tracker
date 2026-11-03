using System.ComponentModel.DataAnnotations;
using ExpenseTracker.Api.Entities;

namespace ExpenseTracker.Api.Dtos;

public class CreateCategoryRequest
{
    [Required, StringLength(50, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;

    [Required, EnumDataType(typeof(TransactionType))]
    public TransactionType Type { get; set; }

    [Required, RegularExpression("^#[0-9A-Fa-f]{6}$",
        ErrorMessage = "Color must be a hex value like #22C55E.")]
    public string Color { get; set; } = string.Empty;
}