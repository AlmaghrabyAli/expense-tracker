using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Api.Validation;

public class MaxDecimalPlacesAttribute : ValidationAttribute
{
    private readonly int _maxPlaces;

    public MaxDecimalPlacesAttribute(int maxPlaces)
    {
        _maxPlaces = maxPlaces;
        ErrorMessage = $"Value must have at most {maxPlaces} decimal places.";
    }

    public override bool IsValid(object? value)
    {
        if (value is null) return true;

        var number = Convert.ToDecimal(value);
        return decimal.Round(number, _maxPlaces) == number;
    }
}