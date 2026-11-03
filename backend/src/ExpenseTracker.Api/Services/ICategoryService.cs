using ExpenseTracker.Api.Dtos;
using ExpenseTracker.Api.Entities;

namespace ExpenseTracker.Api.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAllAsync(int userId, TransactionType? type);
    Task<CategoryDto> CreateAsync(int userId, CreateCategoryRequest request);
    Task<CategoryDto> UpdateAsync(int userId, int id, UpdateCategoryRequest request);
    Task DeleteAsync(int userId, int id);
}