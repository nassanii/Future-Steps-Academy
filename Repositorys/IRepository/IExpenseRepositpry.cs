using FutureStepsAcademy.API.Models;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface IExpenseRepositpry
    {
        Task<Expense> AddExpenseAsync(Expense expense);
        Task<IEnumerable<Expense>> GetAllExpensesAsync(int? categoryId = null, int? teacherId = null);
        Task<Expense> GetExpenseByIdAsync(int id);
        Task UpdateExpenseAsync(Expense expense);
        Task DeleteExpenseAsync(Expense expense);
    }
}
