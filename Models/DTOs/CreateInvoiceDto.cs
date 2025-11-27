using System.ComponentModel.DataAnnotations;

namespace FutureStepsAcademy.API.Models.DTOs;
public class CreateInvoiceDto
{
    [Required]
    public int StudentId { get; set; }

    [Required]
    [StringLength(50)]
    public string InvoiceNo { get; set; }

    public DateTime? IssueDate { get; set; }
    public DateTime? DueDate { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "Invoice must have at least one item")]
    public List<InvoiceItemDto> Items { get; set; } = new List<InvoiceItemDto>();
    public List<CreatePaymentDtoForInvoice> paymant { get; set; } = new List<CreatePaymentDtoForInvoice>();
}