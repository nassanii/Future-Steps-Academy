using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FutureStepsAcademy.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        // FK to student
        public int StudentId { get; set; }
        [JsonIgnore]
        public Student Student { get; set; }

        [Required]
        [StringLength(50)]
        public string InvoiceNo { get; set; }

        public DateTime IssueDate { get; set; }
        public DateTime? DueDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        // Remaining balance after payments
        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        [StringLength(20)]
        public string Status { get; set; } // e.g., "Issued","PartiallyPaid","Paid","Cancelled"

        public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}