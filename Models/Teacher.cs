using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace FutureStepsAcademy.Models
{
    public class Teacher
    {
        [Key]
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public DateOnly HireDate { get; set; }
        public float Salary { get; set; }

        // FK
        public int DepartmentID { get; set; }

        [ForeignKey("DepartmentID")]
        public Department department { get; set; }

        // navigation prop for the many to many relation 
        //public ICollection<Student_Teacher> student_Teachers { get; set; } = new List<Student_Teacher>();

        // navigation prop many to many 
        public ICollection<Teacher_Course> teacher_Courses { get; set; } = new List<Teacher_Course>();

        // Navigation property for payments (salary payments)
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

    }
}