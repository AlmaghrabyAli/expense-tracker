using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Api.Dtos;

// Type is intentionally NOT editable: changing it would break the
// "transaction type must match category type" rule for existing transactions.
public class UpdateCategoryRequest
{
    [Required, StringLength(50, MinimumLength = 1)]
    public string Name { get; set; } = string.Empty;

    [Required, RegularExpression("^#[0-9A-Fa-f]{6}$",
        ErrorMessage = "Color must be a hex value like #22C55E.")]
    public string Color { get; set; } = string.Empty;
}