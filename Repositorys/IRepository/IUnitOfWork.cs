using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Repository.IRepository;

namespace FutureStepsAcademy.Repositorys.IRepository
{
    public interface IUnitOfWork
    {
        IStudentRepository Student { get; }
        ITeacherRepository Teacher { get; }
        IDepartmentRepository Department { get; }
        ICourseRrpository Course { get; }
        IGradeRepository Grade { get; }
        IExpenseRepositpry Expense { get; }
        IExpenseCategoryRepository ExpenseCategory { get; }
        IInvoiceRepository Invoice { get; }
        IpaymentRepository Payment { get; }

        void save();
        Task SaveAsync();

    }
}