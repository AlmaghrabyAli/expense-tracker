using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Extensions;
using ExpenseTracker.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Api.Controllers;

[ApiController]
[Route("api/transactions")]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    // [FromQuery] fills TransactionQuery from ?type=&categoryId=&from=&to=&search=&sortBy=&sortDir=&page=&pageSize=
    [HttpGet]
    public async Task<ActionResult<PagedResult<TransactionDto>>> GetAll([FromQuery] TransactionQuery query)
        => Ok(await _transactionService.GetAllAsync(User.GetUserId(), query));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TransactionDto>> GetById(int id)
        => Ok(await _transactionService.GetByIdAsync(User.GetUserId(), id));

    [HttpPost]
    public async Task<ActionResult<TransactionDto>> Create(CreateTransactionRequest request)
    {
        var created = await _transactionService.CreateAsync(User.GetUserId(), request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TransactionDto>> Update(int id, UpdateTransactionRequest request)
        => Ok(await _transactionService.UpdateAsync(User.GetUserId(), id, request));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _transactionService.DeleteAsync(User.GetUserId(), id);
        return NoContent();
    }
}