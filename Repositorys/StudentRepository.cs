using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.Repositorys
{

    public class StudentRepository : Repository<Student>, IStudentRepository
    {
        private readonly ApplicationDbContext _db;

        public StudentRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Student>> GetAllStudentWithINfo()
        {
            var students = await _db.Students.Include(s => s.department).ToListAsync();
            return students;
        }

        public async Task<Student> GetByIdWithInfo(int id)
        {
            var Student = await _db.Students.Include(s => s.department).Include(s => s.student_Courses).ThenInclude(s => s.course).FirstOrDefaultAsync(u => u.StudentID == id);
            return Student;
        }

        public async Task Update(Student obj)
        {
            _db.Students.Update(obj);

        }

    }






}