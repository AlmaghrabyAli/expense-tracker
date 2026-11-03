using ExpenseTracker.Api.Dtos;

namespace ExpenseTracker.Api.Services;

public interface ITransactionService
{
    Task<PagedResult<TransactionDto>> GetAllAsync(int userId, TransactionQuery query);
    Task<TransactionDto> GetByIdAsync(int userId, int id);
    Task<TransactionDto> CreateAsync(int userId, CreateTransactionRequest request);
    Task<TransactionDto> UpdateAsync(int userId, int id, UpdateTransactionRequest request);
    Task DeleteAsync(int userId, int id);
}