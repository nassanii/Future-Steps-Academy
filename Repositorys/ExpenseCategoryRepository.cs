using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Repositorys;

namespace FutureStepsAcademy.API.Repositorys
{
    public class ExpenseCategoryRepository : Repository<ExpenseCategory>, IExpenseCategoryRepository
    {
        private readonly ApplicationDbContext _db;

        public ExpenseCategoryRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db;
        }

        public async Task<ExpenseCategory> Update(ExpenseCategory category)
        {
            _db.Update(category);
            return category;
        }
    }
}
