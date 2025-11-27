namespace FutureStepsAcademy.API.Models.DTOs
{
    public class ProfitReportDTO
    {
        public int Id { get; set; }
        public DateTime GeneratedAt { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal ProfitOrLoss { get; set; }
        public string Status { get; set; }
        public List<ExpenseByCategoryDTO> ExpensesByCategory { get; set; }
    }
}
