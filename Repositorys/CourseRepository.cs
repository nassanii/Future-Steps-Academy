using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Repositorys
{
    public class CourseRepository : Repository<Course>, ICourseRrpository
    {
        private readonly ApplicationDbContext _db;

        public CourseRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db;
        }

        public async Task<Course> GetByIdWithInfo(int id)
        {
            var course = await _db.Courses.Include(u => u.student_Courses).ThenInclude(u => u.student).
                Include(u => u.teacher_Courses).ThenInclude(u => u.teacher).Include(u => u.course_Departments).ThenInclude(u => u.department).
                FirstOrDefaultAsync(u => u.CourseID == id);
            return course;

        }

        public async Task<IEnumerable<Course>> GetAllWithRelations()
        {
            var courses = await _db.Courses
                .Include(c => c.student_Courses).ThenInclude(sc => sc.student)
                .Include(c => c.teacher_Courses).ThenInclude(tc => tc.teacher)
                .Include(c => c.course_Departments).ThenInclude(cd => cd.department)
                .ToListAsync();
            return courses;
        }

        public async Task Update(Course obj)
        {
            _db.Courses.Update(obj);
        }
    }
}
