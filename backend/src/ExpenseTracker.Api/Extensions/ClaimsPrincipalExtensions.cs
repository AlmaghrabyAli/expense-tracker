using System.Security.Claims;
using ExpenseTracker.Api.Exceptions;
using Microsoft.IdentityModel.JsonWebTokens;

namespace ExpenseTracker.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    // Reads the current user's id from the validated JWT (never from the request body or query string).
    public static int GetUserId(this ClaimsPrincipal user)
    {
        // Depending on claim mapping the id appears as "sub" or as NameIdentifier, so we check both
        var value = user.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    ?? user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(value, out var userId))
            throw new UnauthorizedException("Invalid token.");

        return userId;
    }
}