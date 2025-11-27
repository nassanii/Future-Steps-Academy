namespace FutureStepsAcademy.API.Models.DTOs
{
    public class CreatePaymentDtoForInvoice
    {
        public decimal Amount { get; set; }

        public DateTime? PaymentDate { get; set; }

        public string Description { get; set; }

        public string PaymentType { get; set; }

        public string Method { get; set; }
    }
}
