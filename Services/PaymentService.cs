using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repository.IRepository;
using FutureStepsAcademy.Services.IService;

namespace FutureStepsAcademy.Services;

public class PaymentService : IPaymentService
{
    private readonly IpaymentRepository _paymentRepository;

    public PaymentService(IpaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
    }

    public async Task<Payment> AddPaymentAsync(Payment payment)
    {
        
        return await _paymentRepository.AddPaymentAsync(payment);
    }

    public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
    {
        return await _paymentRepository.GetAllPaymentsAsync();
    }

    public async Task<IEnumerable<Payment>> GetPaymentsByInvoiceIdAsync(int invoiceId)
    {
        return await _paymentRepository.GetPaymentsByInvoiceIdAsync(invoiceId);
    }

    public async Task UpdatePaymentAsync(int id, Payment payment)
    {
        var existingPayment = await _paymentRepository.GetPaymentByIdAsync(id);
        if (existingPayment == null)
        {
            throw new KeyNotFoundException("Payment not found");
        }

        // Update properties
        existingPayment.Method = payment.Method;
        existingPayment.Amount = payment.Amount;
        existingPayment.PaymentDate = payment.PaymentDate;

        await _paymentRepository.UpdatePaymentAsync(existingPayment);
    }

    public async Task DeletePaymentAsync(int id)
    {
        var existingPayment = await _paymentRepository.GetPaymentByIdAsync(id);
        if (existingPayment == null)
        {
            throw new KeyNotFoundException("Payment not found");
        }

        await _paymentRepository.DeletePaymentAsync(id);
    }

    public async Task<Payment?> GetPaymentByIdAsync(int id)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid payment ID");
        }
        return await _paymentRepository.GetPaymentByIdAsync(id);
    }
}