namespace FutureStepsAcademy.Repositorys.IRepository;

using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

public class PaymentRepository : IpaymentRepository
{
    private readonly ApplicationDbContext _db;

    public PaymentRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<Payment> AddPaymentAsync(Payment payment)
    {
        await _db.Payments.AddAsync(payment);
        await _db.SaveChangesAsync();
        return payment;
    }

    public async Task DeletePaymentAsync(int id)
    {
        var payment = await _db.Payments.FindAsync(id);
        if (payment != null)
        {
            _db.Payments.Remove(payment);
            await _db.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
    {
        return await _db.Payments.Include(u => u.Student).Include(u => u.Teacher).Include(u => u.Invoice).ToListAsync();
    }

    public async Task<Payment?> GetPaymentByIdAsync(int id)
    {
        return await _db.Payments.Include(u => u.Student).Include(u => u.Teacher).Include(u => u.Invoice).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Payment>> GetPaymentsByInvoiceIdAsync(int invoiceId)
    {
        return await _db.Payments.Include(u => u.Student).Include(u => u.Teacher).Include(u => u.Invoice).Where(p => p.InvoiceId == invoiceId).ToListAsync();
    }

    public async Task UpdatePaymentAsync(Payment payment)
    {
        _db.Payments.Update(payment);
        await _db.SaveChangesAsync();
    }
}