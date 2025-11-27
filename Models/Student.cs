using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FutureStepsAcademy.Models
{
    public class Student
    {
        [Key]
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Year { get; set; }

        // FK 
        public int DepartmentID { get; set; }
        [ForeignKey("DepartmentID")]
        public Department? department { get; set; }


        // Navigation property - One student can have many payments
         public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

        // navigation prop for the Grade model relation 
        public ICollection<Grade> Grades { get; set; } = new List<Grade>();

        // Navigation prop for the many to many
        //public ICollection<Student_Teacher> student_Teachers { get; set; } = new List<Student_Teacher>();

        // Navigation prop for many to many relaion 
        public ICollection<Student_Course> student_Courses { get; set; } = new List<Student_Course>();
    }
}