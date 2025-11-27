using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Repositorys
{
    public class GradeRepository : IGradeRepository
    {
        private readonly ApplicationDbContext _context;

        public GradeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Grade>> GetAllGradesAsync()
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Course)
                .ToListAsync();
        }

        public async Task<Grade?> GetGradeByIdAsync(int id)
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Course)
                .FirstOrDefaultAsync(g => g.GradeID == id);
        }

        public async Task<IEnumerable<Grade>> GetGradesByStudentIdAsync(int studentId)
        {
            return await _context.Grades
                .Include(u => u.Student)
                .Include(g => g.Course)
                .Where(g => g.StudentID == studentId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Grade>> GetGradesByCourseIdAsync(int courseId)
        {
            return await _context.Grades
                .Include(u => u.Course)
                .Include(g => g.Student)
                .Where(g => g.CourseID == courseId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Grade>> GetGradesByStudentAndCourseAsync(int studentId, int courseId)
        {
            return await _context.Grades
                .Include(u => u.Course).Include(u => u.Student)
                .Where(g => g.StudentID == studentId && g.CourseID == courseId)
                .ToListAsync();
        }

        public async Task<Grade?> GetSpecificGradeAsync(int studentId, int courseId, GradeType gradeType)
        {
            return await _context.Grades
                .FirstOrDefaultAsync(g => g.StudentID == studentId
                                       && g.CourseID == courseId
                                       && g.GradeType == gradeType);
        }

        public async Task<decimal?> GetCourseAverageAsync(int studentId, int courseId)
        {
            var grades = await _context.Grades
                .Where(g => g.StudentID == studentId && g.CourseID == courseId)
                .ToListAsync();

            if (!grades.Any())
                return null;

            return grades.Average(g => g.Score);
        }

        public async Task<Grade> CreateGradeAsync(Grade grade)
        {
            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();
            return grade;
        }

        public async Task<Grade?> UpdateGradeAsync(Grade grade)
        {
            var existing = await _context.Grades.FindAsync(grade.GradeID);
            if (existing == null)
                return null;

            existing.Score = grade.Score;
            existing.GradeType = grade.GradeType;
            existing.DateRecorded = grade.DateRecorded;
            existing.CourseID = grade.CourseID;
            existing.StudentID = grade.StudentID;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteGradeAsync(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
                return false;

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> GradeExistsAsync(int studentId, int courseId, GradeType gradeType)
        {
            return await _context.Grades
                .AnyAsync(g => g.StudentID == studentId
                            && g.CourseID == courseId
                            && g.GradeType == gradeType);
        }
    }
}
