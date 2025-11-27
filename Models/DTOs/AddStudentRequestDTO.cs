namespace FutureStepsAcademy.Models.DTOs;
public class AddStudentRequestDTO
{
    public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Year { get; set; }

        // FK 
         public int DepartmentID { get; set; }

}