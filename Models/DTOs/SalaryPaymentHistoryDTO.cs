namespace FutureStepsAcademy.API.Models.DTOs
{
    public class SalaryPaymentHistoryDTO
    {
        public int ExpenseId { get; set; }
        public string MonthYear { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Description { get; set; }
    }
}
