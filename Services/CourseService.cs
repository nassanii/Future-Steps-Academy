using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repositorys.IRepository;

namespace FutureStepsAcademy.API.Services
{
    public class CourseService : ICourseSevice
    {
        private readonly ApplicationDbContext _db;
        private readonly IUnitOfWork _unitOfWork;

        public CourseService(ApplicationDbContext db, IUnitOfWork unitOfWork)
        {
            this._db = db;
            this._unitOfWork = unitOfWork;
        }

        public async Task AddCourse(Course course)
        {
            await _unitOfWork.Course.AddAsync(course);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteCourse(Course course)
        {
            await _unitOfWork.Course.Remove(course);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<Course>> GetAllCourses()
        {
            var courses = await _unitOfWork.Course.GetAll();
            return courses;
        }

        public async Task<Course> GetCourseById(int id)
        {
            var Course = await _unitOfWork.Course.GetByIdWithInfo(id);
            return Course;
        }

        public async Task UpdateCourse(Course course)
        {
            await _unitOfWork.Course.Update(course);
            await _unitOfWork.SaveAsync();
        }
    }
}
