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

        public async Task Update(Course obj)
        {
            _db.Courses.Update(obj);
        }
    }
}
