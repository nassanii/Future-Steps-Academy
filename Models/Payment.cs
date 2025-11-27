using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FutureStepsAcademy.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }


        public int? StudentId { get; set; }
        public int? TeacherId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        [StringLength(100)]
        public string Description { get; set; }


        [Required]
        [StringLength(50)]
        public string PaymentType { get; set; }


        // e.g., "Cash", "Bank", "Gateway"
        [StringLength(50)]
        public string Method { get; set; }


        // Navigation properties
        [ForeignKey("StudentId")]
        [JsonIgnore]
        public Student? Student { get; set; }

        [ForeignKey("TeacherId")]
        [JsonIgnore]
        public Teacher? Teacher { get; set; }

        public int? InvoiceId { get; set; }
        [JsonIgnore]
        public Invoice Invoice { get; set; }
    }
}