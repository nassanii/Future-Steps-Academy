using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.Repositorys.IRepository

{

    public interface IStudentRepository : IRepository<Student>
    {
        Task Update(Student obj);
        Task<IEnumerable<Student>> GetAllStudentWithINfo();
        Task<Student> GetByIdWithInfo(int id);

    }

}