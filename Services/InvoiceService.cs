namespace FutureStepsAcademy.Services
{
    using FutureStepsAcademy.Models;
    using FutureStepsAcademy.Repositorys.IRepository;
    using FutureStepsAcademy.Services.IService;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoiceService(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        public async Task<Invoice> CreateInvoice(Invoice invoice)
        {
            if (invoice == null)
                throw new ArgumentNullException(nameof(invoice));

            // Calculate total from invoice items if not already set
            if (invoice.InvoiceItems != null && invoice.InvoiceItems.Any())
            {
                invoice.TotalAmount = invoice.InvoiceItems.Sum(i => i.Amount);
            }

            // Calculate total payments
            decimal totalPayments = 0;
            if (invoice.Payments != null && invoice.Payments.Any())
            {
                totalPayments = invoice.Payments.Sum(p => p.Amount);
            }

            // Calculate balance (DON'T overwrite if already set correctly)
            invoice.Balance = invoice.TotalAmount - totalPayments;

            // Determine status based on payments
            if (invoice.TotalAmount == 0)
            {
                invoice.Status = "Issued";
            }
            else if (totalPayments >= invoice.TotalAmount)
            {
                invoice.Status = "Paid";
                invoice.Balance = 0; // No negative balance
            }
            else if (totalPayments > 0)
            {
                invoice.Status = "PartiallyPaid";
            }
            else
            {
                invoice.Status = "Issued";
            }

            // Set IssueDate if not set
            if (invoice.IssueDate == default)
                invoice.IssueDate = DateTime.UtcNow;

            return await _invoiceRepository.AddInvoiceAsync(invoice);
        }

        public async Task<bool> DeleteInvoice(int invoiceId)
        {
            return await _invoiceRepository.DeleteInvoice(invoiceId);
        }

        public async Task<IEnumerable<Invoice>> GetAllInvoicesWithDetails()
        {
            return await _invoiceRepository.GetAllInvoicesWithDetails();
        }

        public async Task<Invoice> GetInvoiceDetails(int invoiceId)
        {
            return await _invoiceRepository.GetInvoiceDetails(invoiceId);
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByStatus(string status)
        {
            return await _invoiceRepository.GetInvoicesByStatus(status);
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByStudentId(int studentId)
        {
            return await _invoiceRepository.GetInvoicesByStudentId(studentId);
        }

        public async Task<IEnumerable<Invoice>> GetOverdueInvoices(DateTime currentDate)
        {
            return await _invoiceRepository.GetOverdueInvoices(currentDate);
        }

        public async Task<Invoice> UpdateInvoice(int id, Invoice invoice)
        {
            var existingInvoice = await _invoiceRepository.GetInvoiceDetails(id);
            if (existingInvoice == null)
                throw new KeyNotFoundException($"Invoice with ID {id} not found.");

            // Update the existing invoice with the new values
            existingInvoice.TotalAmount = invoice.TotalAmount;
            existingInvoice.Balance = invoice.Balance;
            existingInvoice.Status = invoice.Status;
            existingInvoice.IssueDate = invoice.IssueDate;
            existingInvoice.DueDate = invoice.DueDate;

            await _invoiceRepository.UpdateAsync(existingInvoice);
            return existingInvoice;
        }

        public async Task<Invoice> UpdateInvoiceStatus(int invoiceId, string status)
        {
            var invoice = await _invoiceRepository.GetInvoiceDetails(invoiceId);
            if (invoice == null)
                throw new KeyNotFoundException($"Invoice with ID {invoiceId} not found.");

            invoice.Status = status;
            await _invoiceRepository.UpdateAsync(invoice);
            return invoice;
        }

        /// <summary>
        /// Recalculates the balance and status for an invoice based on its payments
        /// Call this after adding/removing payments
        /// </summary>
        public async Task<Invoice> RecalculateInvoiceBalance(int invoiceId)
        {
            var invoice = await _invoiceRepository.GetInvoiceDetails(invoiceId);
            if (invoice == null)
                throw new KeyNotFoundException($"Invoice with ID {invoiceId} not found.");

            // Calculate total payments
            decimal totalPayments = 0;
            if (invoice.Payments != null && invoice.Payments.Any())
            {
                totalPayments = invoice.Payments.Sum(p => p.Amount);
            }

            // Update balance
            invoice.Balance = invoice.TotalAmount - totalPayments;

            // Update status
            if (invoice.TotalAmount == 0)
            {
                invoice.Status = "Issued";
            }
            else if (totalPayments >= invoice.TotalAmount)
            {
                invoice.Status = "Paid";
                invoice.Balance = 0;
            }
            else if (totalPayments > 0)
            {
                invoice.Status = "PartiallyPaid";
            }
            else
            {
                invoice.Status = "Issued";
            }

            await _invoiceRepository.UpdateAsync(invoice);
            return invoice;
        }
    }
}