using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Models.DTOs;
using FutureStepsAcademy.Repositorys.IRepository;
using FutureStepsAcademy.Services.IServices;
namespace FutureStepsAcademy.Services
{

    public class StudentService : IStudentService
    {
        private readonly IUnitOfWork _unitofwork;
        private readonly ApplicationDbContext _db;

        public StudentService(IUnitOfWork unitOfWork, ApplicationDbContext db)
        {
            _unitofwork = unitOfWork;
            this._db = db;
        }

        public async Task AddStudent(Student student)
        {
            await _unitofwork.Student.AddAsync(student);
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteStudent(Student student)
        {
            await _unitofwork.Student.Remove(student);
            await _unitofwork.SaveAsync();
        }

        public async Task<IEnumerable<Student>> GetAllStudents()
        {
            var students = await _unitofwork.Student.GetAllStudentWithINfo();
            return students;
        }

        public async Task<Student> GetStudentById(int id)
        {
            var student = await _unitofwork.Student.GetByIdWithInfo(id);
            return student;
        }

        public Task<Student> GetStudentDetails(int id)
        {
            return _unitofwork.Student.Get(u => u.StudentID == id);
        }

        public async Task UpdateStudent(int id, UpdateStudentRequestDTO updateStudentRequestDTO)
        {
            // Get student with courses
            var existingStudent = await _unitofwork.Student.GetByIdWithInfo(id);

            // Update basic properties
            existingStudent.FirstName = updateStudentRequestDTO.FirstName;
            existingStudent.LastName = updateStudentRequestDTO.LastName;
            existingStudent.Phone = updateStudentRequestDTO.Phone;
            existingStudent.Address = updateStudentRequestDTO.Address;
            existingStudent.Year = updateStudentRequestDTO.Year;
            existingStudent.DepartmentID = updateStudentRequestDTO.DepartmentID;

            // Update courses
            existingStudent.student_Courses.Clear();

            foreach (var courseId in updateStudentRequestDTO.CourseIDs)
            {
                existingStudent.student_Courses.Add(new Student_Course
                {
                    StudentID = existingStudent.StudentID,
                    CourseID = courseId
                });
            }

            await _unitofwork.Student.Update(existingStudent);

            await _unitofwork.SaveAsync();
        }


    }


}