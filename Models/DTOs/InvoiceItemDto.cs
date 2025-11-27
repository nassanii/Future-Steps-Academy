
using System.ComponentModel.DataAnnotations;
namespace FutureStepsAcademy.API.Models.DTOs;
public class InvoiceItemDto
{
    [Required]
    [StringLength(200)]
    public string Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
    public decimal Amount { get; set; }
}