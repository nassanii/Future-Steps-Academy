using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Repositorys
{
    public class ExpenseRepository : IExpenseRepositpry
    {
        private readonly ApplicationDbContext _db;

        public ExpenseRepository(ApplicationDbContext db)
        {
            this._db = db;
        }

        public async Task<Expense> AddExpenseAsync(Expense expense)
        {
            await _db.AddAsync(expense);
            return expense;
        }

        public Task DeleteExpenseAsync(Expense expense)
        {
            _db.Remove(expense);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<Expense>> GetAllExpensesAsync(int? categoryId = null, int? teacherId = null)
        {
            var query = _db.expenses
                .Include(u => u.Category)
                .Include(u => u.teacher)
                .AsNoTracking();

            if (categoryId.HasValue)
                query = query.Where(e => e.CategoryId == categoryId.Value);

            if (teacherId.HasValue)
                query = query.Where(e => e.TeacherId == teacherId.Value);

            var expenses = await query.ToListAsync();
            return expenses;
        }

        public async Task<Expense> GetExpenseByIdAsync(int id)
        {
            var ExpenseByID = await _db.expenses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return ExpenseByID;
        }

        public Task UpdateExpenseAsync(Expense expense)
        {
            _db.Update(expense);
            return Task.CompletedTask;
        }
    }
}
