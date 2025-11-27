using System.ComponentModel.DataAnnotations;


namespace FutureStepsAcademy.Models;

public class Student_Course
{
    // FK1
    public int StudentID { get; set; }
    public Student student { get; set; }

    // FK2
    public int CourseID { get; set; }
    public Course course { get; set; }

    // PK 
    [Key]
    public int Student_CourseID { get; set; }

}