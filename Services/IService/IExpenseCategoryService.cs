using FutureStepsAcademy.API.Models;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface IExpenseCategoryService
    {
        Task<ExpenseCategory> GetExpenseCategoryById(int id);
        Task<IEnumerable<ExpenseCategory>> GetAllExpenseCategory();
        Task<ExpenseCategory> AddExpenseCategory(ExpenseCategory expenseCategory);
        Task<ExpenseCategory> UpdateExpenseCategory(int id, ExpenseCategory expenseCategory);
        Task<ExpenseCategory> DeleteExpenseCategoryById(ExpenseCategory expenseCategory);
    }
}
