namespace FutureStepsAcademy.API.Models.DTOs
{
    public class AddCourseRequestDTO
    {
        public string courseName { get; set; }
        public string CourseCode { get; set; }

        // add list of the Department
        public List<int> departmentIDs { get; set; } = new List<int>();

        // add list of the Teachers 
        public List<int> TeachersIDs { get; set; } = new List<int>();


    }
}
