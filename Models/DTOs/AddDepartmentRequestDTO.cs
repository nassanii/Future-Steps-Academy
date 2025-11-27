namespace FutureStepsAcademy.API.Models.DTOs
{
    public class AddDepartmentRequestDTO
    {
        public string DepartmentName { get; set; }
        public string Department_Code { get; set; }

        public List<int> CourseIDs { get; set; } = new List<int>();
    }
}
