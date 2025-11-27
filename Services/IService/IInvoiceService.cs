namespace FutureStepsAcademy.Services.IService
{
    using FutureStepsAcademy.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IInvoiceService
    {
        Task<Invoice> GetInvoiceDetails(int invoiceId);
        Task<IEnumerable<Invoice>> GetAllInvoicesWithDetails();
        Task<IEnumerable<Invoice>> GetInvoicesByStudentId(int studentId);
        Task<IEnumerable<Invoice>> GetInvoicesByStatus(string status);
        Task<IEnumerable<Invoice>> GetOverdueInvoices(DateTime currentDate);
        Task<Invoice> CreateInvoice(Invoice invoice);
        Task<Invoice> UpdateInvoiceStatus(int invoiceId, string status);
        Task<Invoice> UpdateInvoice(int id , Invoice invoice);
        Task<bool> DeleteInvoice(int invoiceId);
    }
}