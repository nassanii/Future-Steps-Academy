using System.ComponentModel.DataAnnotations;
namespace FutureStepsAcademy.Models;

public class Department
{
    [Key]
    public int DepartmentID { get; set; }
    public string DepartmentName { get; set; }
    public string Department_Code { get; set; }


    // navigatoin prop for the student relation 
    public ICollection<Student> Students { get; set; } = new List<Student>();

    // navgiation prop for the Teacher 
    public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();

    // navigation prop for the Course-Department
    public ICollection<Course_Department> Course_Departments { get; set; } = new List<Course_Department>();
}
