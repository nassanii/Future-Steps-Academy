using System.ComponentModel.DataAnnotations;

namespace FutureStepsAcademy.Models;

public class Teacher_Course
{
    // FK1
    public int TeacherID { get; set; }
    public Teacher teacher { get; set; }

    //FK2

    public int CourseID { get; set; }
    public Course course { get; set; }

    // PK
    [Key]
    public int Teacher_CourseID { get; set; }
}