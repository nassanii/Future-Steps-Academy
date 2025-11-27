using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface IDepartmaentService
    {
        Task<IEnumerable<Department>> GetAllDepartment();
        Task<Department> GetDepartmentById(int id);
        Task AddDepartment(Department department);
        Task DeleteDepartment(Department department);
        Task UpdateDepartment(int id, UpdateDepartmentDTO updateDepartmentDTO);
    }
}
