namespace FutureStepsAcademy.API.Models.DTOs
{
    public class UpdateExpenseDTO
    {
        public int CategoryId { get; set; }
        public int? TeacherId { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public DateTime ExpenseDate { get; set; }
    }
}
