namespace FutureStepsAcademy.API.Models.DTOs
{
    public class GetAllDepartmentsDTO
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string Department_Code { get; set; }
        public List<SimpleCourseDTO> Courses { get; set; } = new List<SimpleCourseDTO>();
    }
}
