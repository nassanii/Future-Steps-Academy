using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Services
{
    public class ExpenseCategoryService : IExpenseCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExpenseCategoryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<ExpenseCategory> AddExpenseCategory(ExpenseCategory expenseCategory)
        {
            if (expenseCategory == null)
                throw new ArgumentNullException(nameof(expenseCategory));

            await _unitOfWork.ExpenseCategory.AddAsync(expenseCategory);
            await _unitOfWork.SaveAsync();
            return expenseCategory;
        }

        public async Task<ExpenseCategory> DeleteExpenseCategoryById(ExpenseCategory expenseCategory)
        {

            if (expenseCategory == null)
                throw new ArgumentNullException(nameof(expenseCategory));

            await _unitOfWork.ExpenseCategory.Remove(expenseCategory);
            await _unitOfWork.SaveAsync();
            return expenseCategory;
        }

        public async Task<IEnumerable<ExpenseCategory>> GetAllExpenseCategory()
        {
            var Categories = await _unitOfWork.ExpenseCategory.GetAll();
            return Categories;
        }

        public async Task<ExpenseCategory> GetExpenseCategoryById(int id)
        {
            return await _unitOfWork.ExpenseCategory.Get(x => x.Id == id);
        }

        public async Task<ExpenseCategory> UpdateExpenseCategory(int id, ExpenseCategory expenseCategory)
        {
            if (id == 0)
                throw new ArgumentException("Invalid ID ", nameof(id));

            if (expenseCategory == null)
                throw new ArgumentNullException(nameof(expenseCategory));

            var Category = await _unitOfWork.ExpenseCategory.Get(x => x.Id == id);
            Category.Name = expenseCategory.Name;
            Category.Id = id;
            await _unitOfWork.SaveAsync();
            await _unitOfWork.ExpenseCategory.Update(Category);
            return Category;
        }
    }
}
