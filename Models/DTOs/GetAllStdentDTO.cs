namespace FutureStepsAcademy.API.Models.DTOs
{
    public class GetAllStdentDTO
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Year { get; set; }
        // FK
        public string DepartmentName { get; set; }
    }
}
