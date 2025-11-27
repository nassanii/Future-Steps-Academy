namespace FutureStepsAcademy.API.Models.DTOs
{
    public class TeacherDTO
    {
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public DateOnly HireDate { get; set; }
        public float Salary { get; set; }

        // FK
        public string DepartmentName { get; set; }
        public string Department_Code { get; set; }

        // return coureses List 
        public List<SimpleCourseDTO> Courses { get; set; } = new List<SimpleCourseDTO>();
    }
}
