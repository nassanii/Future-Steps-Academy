namespace FutureStepsAcademy.Repositorys.IRepository
{
    using FutureStepsAcademy.Models;

    public interface IInvoiceRepository 
    {
        Task<Invoice> GetInvoiceDetails(int invoiceId);
        Task<IEnumerable<Invoice>> GetAllInvoicesWithDetails();
        Task<IEnumerable<Invoice>> GetInvoicesByStudentId(int studentId);
        Task<IEnumerable<Invoice>> GetInvoicesByStatus(string status);
        Task<IEnumerable<Invoice>> GetOverdueInvoices(DateTime currentDate);
        Task<Invoice> AddInvoiceAsync(Invoice invoice);
        Task<bool> DeleteInvoice(int invoiceId);
        Task<Invoice> UpdateAsync(Invoice invoice);
        
    }
}