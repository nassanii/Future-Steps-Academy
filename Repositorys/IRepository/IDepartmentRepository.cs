using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Task Update(Department obj);
        Task<Department> GetByIdWithInfo(int id);
        Task<IEnumerable<Department>> GetAllWithRelations();
    }
}
