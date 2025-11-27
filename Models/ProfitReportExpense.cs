using System.Text.Json.Serialization;

namespace FutureStepsAcademy.API.Models
{
    public class ProfitReportExpense
    {
        public int Id { get; set; }
        public int ProfitReportId { get; set; }
        [JsonIgnore]
        public ProfitReport ProfitReport { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
