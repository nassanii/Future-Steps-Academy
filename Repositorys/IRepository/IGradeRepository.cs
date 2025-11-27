using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.API.Repositorys.IRepository
{
    public interface IGradeRepository
    {
        Task<IEnumerable<Grade>> GetAllGradesAsync();
        Task<Grade?> GetGradeByIdAsync(int id);
        Task<IEnumerable<Grade>> GetGradesByStudentIdAsync(int studentId);
        Task<IEnumerable<Grade>> GetGradesByCourseIdAsync(int courseId);
        Task<IEnumerable<Grade>> GetGradesByStudentAndCourseAsync(int studentId, int courseId);
        Task<Grade?> GetSpecificGradeAsync(int studentId, int courseId, GradeType gradeType);
        Task<decimal?> GetCourseAverageAsync(int studentId, int courseId);
        Task<Grade> CreateGradeAsync(Grade grade);
        Task<Grade?> UpdateGradeAsync(Grade grade);
        Task<bool> DeleteGradeAsync(int id);
        Task<bool> GradeExistsAsync(int studentId, int courseId, GradeType gradeType);
    }
}
