namespace FutureStepsAcademy.Models;
public class Course
{
    public int CourseID { get; set; }
    public string courseName { get; set; }
    public string CourseCode { get; set; }

    // FK
    //public int calssID { get; set; }

    //[ForeignKey("ClassID")]
    //public Class calss { get; set; }


    // navigation prop for the grade one to many relation 
    ICollection<Grade> Grades { get; set; } = new List<Grade>();

    // navigation prop many to many raltion
    public ICollection<Student_Course> student_Courses { get; set; } = new List<Student_Course>();

    // navigation prop namy to many prop
    public ICollection<Teacher_Course> teacher_Courses { get; set; } = new List<Teacher_Course>();

    // navigation prop many to many prop
    public ICollection<Course_Department> course_Departments { get; set; } = new List<Course_Department>();
}