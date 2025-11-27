using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.Services.IService
{
    public interface IPaymentService
    {
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<IEnumerable<Payment>> GetPaymentsByInvoiceIdAsync(int invoiceId);
        Task<Payment?> GetPaymentByIdAsync(int id);
        Task UpdatePaymentAsync(int id, Payment payment);
        Task DeletePaymentAsync(int id);
    }
}