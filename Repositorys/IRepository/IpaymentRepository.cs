using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.Repository.IRepository
{
    public interface IpaymentRepository
    {
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task<IEnumerable<Payment>> GetPaymentsByInvoiceIdAsync(int invoiceId);
        Task<Payment?> GetPaymentByIdAsync(int id);
        Task UpdatePaymentAsync(Payment payment);
        Task DeletePaymentAsync(int id);
        
    }
}