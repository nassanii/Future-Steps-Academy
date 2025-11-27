namespace FutureStepsAcademy.API.Models.DTOs
{
    public class UpdateDepartmentDTO
    {
        public string DepartmentName { get; set; }
        public string Department_Code { get; set; }

        // list of the Courses 
        public List<int> CourseIDs { get; set; } = new List<int>();
    }
}
