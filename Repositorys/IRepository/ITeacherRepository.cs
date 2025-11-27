using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface ITeacherRepository : IRepository<Teacher>
    {
        Task update(Teacher teacher);
        Task<IEnumerable<Teacher>> GetAllWithInfo();
        Task<Teacher> GetByIdWithInfo(int id);
    }
}
