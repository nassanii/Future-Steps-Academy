using FutureStepsAcademy.API.Repositorys;
using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Repository.IRepository;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.Repositorys
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;

        public IStudentRepository Student { get; private set; }
        public ITeacherRepository Teacher { get; private set; }
        public IDepartmentRepository Department { get; private set; }
        public ICourseRrpository Course { get; private set; }
        public IGradeRepository Grade { get; private set; }
        public IInvoiceRepository Invoice { get; private set; }
        public IpaymentRepository Payment { get; private set; }
        public IExpenseCategoryRepository ExpenseCategory { get; private set; }
        public IExpenseRepositpry Expense { get; private set; }




        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Student = new StudentRepository(_db);
            Teacher = new TeacherRepository(_db);
            Department = new DepartmentRepository(_db);
            Course = new CourseRepository(_db);
            Grade = new GradeRepository(_db);
            Invoice = new InvoiceRepository(_db);
            Payment = new PaymentRepository(_db);
            Expense = new ExpenseRepository(_db);
            ExpenseCategory = new ExpenseCategoryRepository(_db);



        }



        public void save()
        {
            _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

    }
}