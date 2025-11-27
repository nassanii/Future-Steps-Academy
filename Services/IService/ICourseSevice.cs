using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface ICourseSevice
    {
        Task<IEnumerable<Course>> GetAllCourses();
        Task<Course> GetCourseById(int id);
        Task AddCourse(Course course);
        Task DeleteCourse(Course course);
        Task UpdateCourse(Course course);
    }
}
