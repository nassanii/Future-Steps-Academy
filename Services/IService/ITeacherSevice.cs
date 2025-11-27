using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Models;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.API.Services.IService
{
    public interface ITeacherService
    {
        Task<IEnumerable<Teacher>> GetAllTeachers();
        Task<Teacher> GetTeacherById(int id);
        Task AddTeacher(Teacher teacher);
        Task DeleteTeacher(Teacher teacher);
        Task UpdateTreacher(int id, [FromBody] UpdateTeacherRequestDTO updateTeacherRequestDTO);
        Task<Teacher> GetTeacherDetails(int id);
    }
}
