using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;


namespace FutureStepsAcademy.API.Services
{
    public class DepartmentService : IDepartmaentService
    {
        private readonly ApplicationDbContext _db;
        private readonly IUnitOfWork _unitOfWork;

        public DepartmentService(ApplicationDbContext db, IUnitOfWork unitOfWork)
        {
            this._db = db;
            this._unitOfWork = unitOfWork;
        }

        public async Task AddDepartment(Department department)
        {
            await _unitOfWork.Department.AddAsync(department);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteDepartment(Department department)
        {
            await _unitOfWork.Department.Remove(department);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<Department>> GetAllDepartment()
        {
            var departments = await _unitOfWork.Department.GetAll();
            return departments;
        }

        public async Task<Department> GetDepartmentById(int id)
        {
            var department = await _unitOfWork.Department.GetByIdWithInfo(id);
            return department;
        }

        public async Task UpdateDepartment(int id, UpdateDepartmentDTO updateDepartmentDTO)
        {
            var DepartmentInDB = await _unitOfWork.Department.GetByIdWithInfo(id);

            if (DepartmentInDB == null)
            {
                return;
            }

            DepartmentInDB.DepartmentName = updateDepartmentDTO.DepartmentName;
            DepartmentInDB.Department_Code = updateDepartmentDTO.Department_Code;

            DepartmentInDB.Course_Departments.Clear();

            foreach (var coursesId in updateDepartmentDTO.CourseIDs)
            {
                DepartmentInDB.Course_Departments.Add(new Course_Department
                {
                    DepartmentID = DepartmentInDB.DepartmentID,
                    CourseID = coursesId
                });
            }

            await _unitOfWork.Department.Update(DepartmentInDB);
            await _unitOfWork.SaveAsync();
        }
    }
}
