namespace FutureStepsAcademy.API.Models.DTOs
{
    public class AddTeacherRequestDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public DateOnly HireDate { get; set; }
        public float Salary { get; set; }

        // FK
        public int DepartmentID { get; set; }
    }
}
