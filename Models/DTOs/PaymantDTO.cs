namespace FutureStepsAcademy.API.Models.DTOs;

public class PaymantDTO
{
    public int InvoiceId { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string Description { get; set; }
    public string PaymentType { get; set; }
    // e.g., "Cash", "Bank", "Gateway"
    public string Method { get; set; }

}