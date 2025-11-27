using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface IExpenseCategoryRepository : IRepository<ExpenseCategory>
    {
        Task<ExpenseCategory> Update(ExpenseCategory category);
    }
}
