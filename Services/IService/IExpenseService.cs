using FutureStepsAcademy.API.Models;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface IExpenseService
    {
        public Task<Expense> AddExpense(Expense expense);
        public Task<IEnumerable<Expense>> GetAllExpense(int? TeacherID, int? CategoryID);
        public Task<Expense> GetById(int id);
        public Task<Expense> Update(int Id, Expense expense);
        public Task<Expense> DeleteById(int id);

    }
}
