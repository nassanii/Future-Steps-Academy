using FutureStepsAcademy.API.Repositorys.IRepository;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Repositorys
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        private readonly ApplicationDbContext _db;

        public DepartmentRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db;
        }

        public async Task<Department> GetByIdWithInfo(int id)
        {
            var Departments = await _db.Departments.Include(u => u.Course_Departments).ThenInclude(u => u.course).FirstOrDefaultAsync(u => u.DepartmentID == id);
            return Departments;
        }

        public async Task Update(Department obj)
        {
            _db.Departments.Update(obj);
        }
    }
}
