namespace FutureStepsAcademy.API.Models.DTOs;

public class InvoiceDto
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string StudentName { get; set; }
    public string InvoiceNo { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? DueDate { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal Balance { get; set; }
    public string Status { get; set; }
    public List<InvoiceItemDto> Items { get; set; } = new List<InvoiceItemDto>();
    public List<PaymantDTO> Payments { get; set; } = new List<PaymantDTO>();
}