using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.Services
{

    public class TeacherService : ITeacherService
    {
        private readonly IUnitOfWork _unitofwork;
        private readonly ApplicationDbContext _db;

        public TeacherService(IUnitOfWork unitOfWork, ApplicationDbContext db)
        {
            _unitofwork = unitOfWork;
            this._db = db;
        }

        public async Task AddTeacher(Teacher teacher)
        {
            await _unitofwork.Teacher.AddAsync(teacher);
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteTeacher(Teacher teacher)
        {
            await _unitofwork.Teacher.Remove(teacher);
            await _unitofwork.SaveAsync();
        }

        public async Task<IEnumerable<Teacher>> GetAllTeachers()
        {
            var teachers = await _unitofwork.Teacher.GetAllWithInfo();
            return teachers;

        }

        public async Task<Teacher> GetTeacherById(int id)
        {
            var teacher = await _unitofwork.Teacher.GetByIdWithInfo(id);
            return teacher;
        }

        public async Task<Teacher> GetTeacherDetails(int id)
        {
            return await _unitofwork.Teacher.Get(u => u.TeacherID == id);
        }

        public async Task UpdateTreacher(int id, [FromBody] UpdateTeacherRequestDTO updateTeacherRequestDTO)
        {
            var TeacherFromDB = await _unitofwork.Teacher.GetByIdWithInfo(id);

            // update the prop 
            TeacherFromDB.FirstName = updateTeacherRequestDTO.FirstName;
            TeacherFromDB.LastName = updateTeacherRequestDTO.LastName;
            TeacherFromDB.Address = updateTeacherRequestDTO.Address;
            TeacherFromDB.Phone = updateTeacherRequestDTO.Phone;
            TeacherFromDB.DepartmentID = updateTeacherRequestDTO.DepartmentID;
            TeacherFromDB.Email = updateTeacherRequestDTO.Email;

            TeacherFromDB.teacher_Courses.Clear();

            foreach (var courseId in updateTeacherRequestDTO.CourseIDs)
            {
                TeacherFromDB.teacher_Courses.Add(new Teacher_Course
                {
                    TeacherID = TeacherFromDB.TeacherID,
                    CourseID = courseId
                });
            }
            await _unitofwork.Teacher.update(TeacherFromDB);
            await _unitofwork.SaveAsync();
        }


    }


}