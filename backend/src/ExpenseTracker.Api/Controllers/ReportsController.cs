using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;
using ExpenseTracker.Api.Extensions;
using ExpenseTracker.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    // GET /api/reports/summary?from=2026-11-01&to=2026-11-30
    [HttpGet("summary")]
    public async Task<ActionResult<SummaryDto>> GetSummary([FromQuery] DateOnly? from, [FromQuery] DateOnly? to)
        => Ok(await _reportService.GetSummaryAsync(User.GetUserId(), from, to));

    // GET /api/reports/by-category?type=Expense&from=...&to=...   (type defaults to Expense)
    [HttpGet("by-category")]
    public async Task<ActionResult<List<CategoryTotalDto>>> GetByCategory(
        [FromQuery] TransactionType type = TransactionType.Expense,
        [FromQuery] DateOnly? from = null,
        [FromQuery] DateOnly? to = null)
        => Ok(await _reportService.GetByCategoryAsync(User.GetUserId(), type, from, to));

    // GET /api/reports/monthly?year=2026   (year defaults to the current year)
    [HttpGet("monthly")]
    public async Task<ActionResult<List<MonthlyReportItemDto>>> GetMonthly([FromQuery] int? year)
        => Ok(await _reportService.GetMonthlyAsync(User.GetUserId(), year));
}