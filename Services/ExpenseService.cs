using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Services
{
    public class ExpenseService : IExpenseService
    {

        private readonly IUnitOfWork _unitOfWork;

        public ExpenseService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Expense> AddExpense(Expense expense)
        {
            await _unitOfWork.Expense.AddExpenseAsync(expense);
            await _unitOfWork.SaveAsync();
            return expense;
        }

        public async Task<Expense> DeleteById(int id)
        {
            var expense = await _unitOfWork.Expense.GetExpenseByIdAsync(id);
            await _unitOfWork.Expense.DeleteExpenseAsync(expense);
            await _unitOfWork.SaveAsync();
            return expense;
        }

        public async Task<IEnumerable<Expense>> GetAllExpense(int? TeacherID, int? CategoryID)
        {
            var Expenses = await _unitOfWork.Expense.GetAllExpensesAsync(CategoryID, TeacherID);
            return Expenses;
        }

        public async Task<Expense> GetById(int id)
        {
            var expense = await _unitOfWork.Expense.GetExpenseByIdAsync(id);
            return expense;
        }

        public async Task<Expense> Update(int Id, Expense expense)
        {
            var expenseFromDb = await _unitOfWork.Expense.GetExpenseByIdAsync(Id);

            expenseFromDb.Description = expense.Description;
            expenseFromDb.CategoryId = expense.CategoryId;
            expenseFromDb.TeacherId = expense.TeacherId;
            expenseFromDb.Amount = expense.Amount;

            await _unitOfWork.Expense.UpdateExpenseAsync(expenseFromDb);
            await _unitOfWork.SaveAsync();
            return expenseFromDb;
        }
    }
}
