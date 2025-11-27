using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Services
{
    public class GradeService : IGradeService
    {
        private readonly IGradeRepository _gradeRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRrpository _courseRepository;

        public GradeService(
            IGradeRepository gradeRepository,
            IStudentRepository studentRepository,
            ICourseRrpository courseRepository)
        {
            _gradeRepository = gradeRepository;
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
        }

        public async Task<IEnumerable<Grade>> GetAllGradesAsync()
        {
            return await _gradeRepository.GetAllGradesAsync();
        }

        public async Task<Grade?> GetGradeByIdAsync(int id)
        {
            return await _gradeRepository.GetGradeByIdAsync(id);
        }

        public async Task<IEnumerable<Grade>> GetStudentGradesAsync(int studentId)
        {
            return await _gradeRepository.GetGradesByStudentIdAsync(studentId);
        }

        public async Task<IEnumerable<Grade>> GetCourseGradesAsync(int courseId)
        {
            return await _gradeRepository.GetGradesByCourseIdAsync(courseId);
        }

        public async Task<IEnumerable<Grade>> GetStudentCourseGradesAsync(int studentId, int courseId)
        {
            return await _gradeRepository.GetGradesByStudentAndCourseAsync(studentId, courseId);
        }

        public async Task<decimal?> GetCourseAverageAsync(int studentId, int courseId)
        {
            return await _gradeRepository.GetCourseAverageAsync(studentId, courseId);
        }

        public async Task<Grade> CreateGradeAsync(int studentId, int courseId, GradeType gradeType, decimal score)
        {
            // Validate student exists
            var student = await _studentRepository.GetByIdWithInfo(studentId);
            if (student == null)
                throw new ArgumentException($"Student with ID {studentId} not found");

            // Validate course exists
            var course = await _courseRepository.GetByIdWithInfo(courseId);
            if (course == null)
                throw new ArgumentException($"Course with ID {courseId} not found");

            // Check if this grade type already exists for this student-course combination
            var exists = await _gradeRepository.GradeExistsAsync(studentId, courseId, gradeType);
            if (exists)
                throw new InvalidOperationException(
                    $"A {gradeType} grade already exists for this student in this course");

            // Validate score range
            if (score < 0 || score > 100)
                throw new ArgumentException("Score must be between 0 and 100");

            var grade = new Grade
            {
                StudentID = studentId,
                CourseID = courseId,
                GradeType = gradeType,
                Score = score,
                DateRecorded = DateTime.UtcNow
            };

            var created = await _gradeRepository.CreateGradeAsync(grade);

            // Reload with navigation properties
            return await _gradeRepository.GetGradeByIdAsync(created.GradeID) ?? created;
        }

        public async Task<Grade?> UpdateGradeAsync(int id, decimal score)
        {
            var existing = await _gradeRepository.GetGradeByIdAsync(id);
            if (existing == null)
                return null;

            // Validate score range
            if (score < 0 || score > 100)
                throw new ArgumentException("Score must be between 0 and 100");

            existing.Score = score;
            existing.DateRecorded = DateTime.UtcNow;

            return await _gradeRepository.UpdateGradeAsync(existing);
        }

        public async Task<bool> DeleteGradeAsync(int id)
        {
            return await _gradeRepository.DeleteGradeAsync(id);
        }
    }
}
