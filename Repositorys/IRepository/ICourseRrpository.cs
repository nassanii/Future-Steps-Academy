using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface ICourseRrpository : IRepository<Course>
    {
        Task Update(Course obj);
        Task<Course> GetByIdWithInfo(int id);
    }
}
