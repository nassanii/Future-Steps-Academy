using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Repositorys
{
    public class TeacherRepository : Repository<Teacher>, ITeacherRepository
    {
        private readonly ApplicationDbContext _db;

        public TeacherRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db;
        }

        public async Task<IEnumerable<Teacher>> GetAllWithInfo()
        {
            var Teachers = await _db.Teachers
                .Include(u => u.department)
                .Include(u => u.teacher_Courses).ThenInclude(u => u.course)
                .ToListAsync();
            return Teachers;
        }

        public async Task<Teacher> GetByIdWithInfo(int id)
        {
            var teacher = await _db.Teachers.Include(u => u.department).Include(u => u.teacher_Courses).ThenInclude(u => u.course).FirstOrDefaultAsync(u => u.TeacherID == id);
            return teacher;
        }

        public async Task update(Teacher teacher)
        {
            _db.Teachers.Update(teacher);
        }
    }
}
