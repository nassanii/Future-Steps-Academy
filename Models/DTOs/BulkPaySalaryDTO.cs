using System.ComponentModel.DataAnnotations;

namespace FutureStepsAcademy.API.Models.DTOs
{
    public class BulkPaySalaryDTO
    {
        [Required]
        [Range(1, 12)]
        public int Month { get; set; }

        [Required]
        [Range(2020, 2100)]
        public int Year { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        public string? Notes { get; set; }
        
        public string? PaymentMethod { get; set; } // e.g., "Bank Transfer", "Cash", "Check"
    }
}
