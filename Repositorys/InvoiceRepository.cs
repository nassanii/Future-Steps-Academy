namespace FutureStepsAcademy.Repositorys.IRepository
{
    using FutureStepsAcademy.Data;
    using FutureStepsAcademy.Models;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ApplicationDbContext db;

        public InvoiceRepository(ApplicationDbContext _db)
        {
            db = _db;
        }

        public async Task<Invoice> AddInvoiceAsync(Invoice invoice)
        {
            if (invoice == null)
                throw new ArgumentNullException(nameof(invoice));

            // Add to DbContext
            await db.invoices.AddAsync(invoice);
            await db.SaveChangesAsync();
            return invoice;
        }

        public async Task<bool> DeleteInvoice(int invoiceId)
        {
            await Remove(await Get(i => i.Id == invoiceId));
            return true;
        }

        public async Task<IEnumerable<Invoice>> Find(Expression<Func<Invoice, bool>> predicate)
        {
            return await db.invoices.Where(predicate).ToListAsync();
        }

        public async Task<Invoice> Get(Expression<Func<Invoice, bool>> filter)
        {
            var invoice = await db.invoices.FirstOrDefaultAsync(filter);
            return invoice;
        }

        public async Task<IEnumerable<Invoice>> GetAll()
        {
            return await db.invoices.ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetAllInvoicesWithDetails()

        {
            return await db.invoices.Include(u => u.InvoiceItems).Include(u => u.Payments).Include(u => u.Student).ToListAsync();
        }

        public async Task<Invoice> GetInvoiceDetails(int invoiceId)
        {
            return await db.invoices.Include(u => u.InvoiceItems).Include(u => u.Payments).Include(u => u.Student).FirstOrDefaultAsync(u => u.Id == invoiceId);
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByStatus(string status)
        {
            return await db.invoices.Include(u => u.Student).Include(u => u.InvoiceItems).Include(u => u.Payments).Where(u => u.Status == status).ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByStudentId(int studentId)
        {
            return await db.invoices.Include(u => u.Student).Include(u => u.InvoiceItems).Include(u => u.Payments).Where(u => u.StudentId == studentId).ToListAsync();
        }

        public async Task<IEnumerable<Invoice>> GetOverdueInvoices(DateTime currentDate)
        {
            return await db.invoices.Include(u => u.Student).Include(u => u.InvoiceItems).Include(u => u.Payments)
                .Where(u => u.DueDate < currentDate
                         && u.Status != null
                         && !EF.Functions.Like(u.Status, "Paid")
                         && !EF.Functions.Like(u.Status, "Cancelled"))
                .ToListAsync();
        }

        public Task Remove(Invoice entity)
        {
            if (entity != null)
            {
                db.invoices.Remove(entity);
                db.SaveChangesAsync();
            }
            return Task.CompletedTask;
        }

        public Task<Invoice> UpdateAsync(Invoice invoice)
        {
            if (invoice == null)
                throw new ArgumentNullException(nameof(invoice));

            db.invoices.Update(invoice);
            db.SaveChanges();
            return Task.FromResult(invoice);
        }


    }

}