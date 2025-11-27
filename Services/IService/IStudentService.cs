using FutureStepsAcademy.Models;
using FutureStepsAcademy.Models.DTOs;

namespace FutureStepsAcademy.Services.IServices

{

    public interface IStudentService
    {

        Task<IEnumerable<Student>> GetAllStudents();
        Task<Student> GetStudentById(int id);
        Task AddStudent(Student student);
        Task DeleteStudent(Student student);
        Task UpdateStudent(int id, UpdateStudentRequestDTO updateStudentRequestDTO);
        Task<Student> GetStudentDetails(int id);


    }

}