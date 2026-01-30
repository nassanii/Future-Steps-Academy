namespace FutureStepsAcademy.API.Models.DTOs
{
    public class UpdateCourseRequestDTO
    {
        public string courseName { get; set; }
        public string CourseCode { get; set; }
        
        // Lists for many-to-many relationships
        public List<int> departmentIDs { get; set; } = new List<int>();
        public List<int> TeachersIDs { get; set; } = new List<int>();
    }
}
