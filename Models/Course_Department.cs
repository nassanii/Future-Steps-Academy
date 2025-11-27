using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FutureStepsAcademy.Models;

public class Course_Department
{

    //PK
    [Key]
    public int Course_DepartmentID { get; set; }

    // FK 1
    public int CourseID { get; set; }
    [ForeignKey("CourseID")]
    public Course course { get; set; }

    //FK 1
    public int DepartmentID { get; set; }
    [ForeignKey("DepartmentID")]
    public Department department { get; set; }




}