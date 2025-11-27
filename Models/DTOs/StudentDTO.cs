using FutureStepsAcademy.API.Models.DTOs;

namespace FutureStepsAcademy.Models.DTOs;

public class StudentDTO
{
    public int StudentID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Year { get; set; }
    // FK
    public string DepartmentName { get; set; }
    public string Department_Code { get; set; }

    // Return list of courses
    public List<SimpleCourseDTO> Courses { get; set; } = new List<SimpleCourseDTO>();
}