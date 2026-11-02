using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Api.Dtos;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(72)]
    public string Password { get; set; } = string.Empty;
}