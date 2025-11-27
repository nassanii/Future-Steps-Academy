using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface IGradeService
    {
        Task<IEnumerable<Grade>> GetAllGradesAsync();
        Task<Grade?> GetGradeByIdAsync(int id);
        Task<IEnumerable<Grade>> GetStudentGradesAsync(int studentId);
        Task<IEnumerable<Grade>> GetCourseGradesAsync(int courseId);
        Task<IEnumerable<Grade>> GetStudentCourseGradesAsync(int studentId, int courseId);
        Task<decimal?> GetCourseAverageAsync(int studentId, int courseId);
        Task<Grade> CreateGradeAsync(int studentId, int courseId, GradeType gradeType, decimal score);
        Task<Grade?> UpdateGradeAsync(int id, decimal score);
        Task<bool> DeleteGradeAsync(int id);
    }
}
