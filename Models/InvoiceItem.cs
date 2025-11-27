using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FutureStepsAcademy.Models
{
    public class InvoiceItem
    {
        [Key]
        public int Id { get; set; }

        // FK

        public int InvoiceId { get; set; }
        [JsonIgnore]
        public Invoice Invoice { get; set; }

        [Required]
        [StringLength(200)]
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
    }
}