namespace FutureStepsAcademy.API.Models.DTOs
{
    public class DepartmentDTO
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string Department_Code { get; set; }

        // return list of the Courses 
        public List<SimpleCourseDTO> Courses { get; set; } = new List<SimpleCourseDTO>();
    }
}
