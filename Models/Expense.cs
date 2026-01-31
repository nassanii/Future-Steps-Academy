using FutureStepsAcademy.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace FutureStepsAcademy.API.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int? TeacherId { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string? PaymentMethod { get; set; } // e.g., "Bank Transfer", "Cash", "Check"
        [ForeignKey("CategoryId")]
        public ExpenseCategory Category { get; set; }
        [ForeignKey("TeacherId")]
        public Teacher? teacher { get; set; }
    }
}
