
using System.ComponentModel.DataAnnotations;

namespace FutureStepsAcademy.API.Models.DTOs;
public class UpdateInvoiceDto
{
    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal TotalAmount { get; set; }

    [Required]
    [Range(0, double.MaxValue)]
    public decimal Balance { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; }

    public DateTime IssueDate { get; set; }
    public DateTime? DueDate { get; set; }
}