namespace FutureStepsAcademy.API.Models.DTOs
{
    public class TeacherSalaryStatusDTO
    {
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public decimal MonthlySalary { get; set; }
        public bool IsPaid { get; set; }
        public DateTime? PaymentDate { get; set; }
        public int? ExpenseId { get; set; }
    }
}
