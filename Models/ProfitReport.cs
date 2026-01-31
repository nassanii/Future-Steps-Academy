namespace FutureStepsAcademy.API.Models
{
    public class ProfitReport
    {
        public int Id { get; set; }
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
        public decimal TotalIncome { get; set; }
        public decimal TotalDebt { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal ProfitOrLoss { get; set; }
        public string Status { get; set; }
        public List<ProfitReportExpense> ExpensesByCategory { get; set; } = new();
    }
}
