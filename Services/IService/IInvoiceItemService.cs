using FutureStepsAcademy.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FutureStepsAcademy.Services.IService
{
    public interface IInvoiceItemService
    {
        Task<InvoiceItem> CreateInvoiceItem(InvoiceItem invoiceItem);
        Task<InvoiceItem> GetInvoiceItemById(int id);
        Task<IEnumerable<InvoiceItem>> GetInvoiceItemsByInvoiceId(int invoiceId);
        Task<IEnumerable<InvoiceItem>> GetAllInvoiceItems();
        Task<InvoiceItem> UpdateInvoiceItem(int id, InvoiceItem invoiceItem);
        Task<bool> DeleteInvoiceItem(int id);
        Task<decimal> GetTotalAmountByInvoiceId(int invoiceId);
       
    }

}