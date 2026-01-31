using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FutureStepsAcademy.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IInvoiceService _invoiceService;
        private readonly IExpenseService _expenseService;

        public ReportController(ApplicationDbContext db, IInvoiceService invoiceService, IExpenseService expenseService)
        {
            _db = db;
            _invoiceService = invoiceService;
            _expenseService = expenseService;
        }

        [HttpPost("generate-report")]
        public async Task<ActionResult<ProfitReportDTO>> GenerateAndSaveReport([FromQuery] int month, [FromQuery] int year)
        {
            var filteredInvoices = await _db.invoices
                .Where(i => i.IssueDate.Month == month && i.IssueDate.Year == year)
                .ToListAsync();

            var filteredExpenses = await _db.expenses
                .Include(e => e.Category)
                .Where(e => e.ExpenseDate.Month == month && e.ExpenseDate.Year == year)
                .ToListAsync();

            decimal totalDebt = filteredInvoices.Sum(i => i.Balance);
            // Total Income should be the amount PAID, not total invoice amount
            decimal totalIncome = filteredInvoices.Sum(i => i.TotalAmount - i.Balance);
            
            decimal totalExpenses = filteredExpenses.Sum(e => e.Amount);
            decimal profitOrLoss = totalIncome - totalExpenses;
            
            string monthName = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month);
            string baseStatus = profitOrLoss > 0 ? "Profit" : profitOrLoss < 0 ? "Loss" : "Break-even";
            string status = $"{baseStatus} ({monthName} {year})";

            var expensesByCategory = filteredExpenses
                .GroupBy(e => e.CategoryId)
                .Select(g => new ExpenseByCategoryDTO
                {
                    CategoryId = g.Key,
                    CategoryName = g.First().Category?.Name ?? "Unknown",
                    TotalAmount = g.Sum(x => x.Amount)
                })
                .ToList();

            var reportDto = new ProfitReportDTO
            {
                TotalIncome = totalIncome,
                TotalDebt = totalDebt,
                TotalExpenses = totalExpenses,
                ProfitOrLoss = profitOrLoss,
                Status = status,
                GeneratedAt = DateTime.UtcNow,
                ExpensesByCategory = expensesByCategory
            };

            // Save to DB
            var report = new ProfitReport
            {
                TotalIncome = reportDto.TotalIncome,
                TotalDebt = reportDto.TotalDebt,
                TotalExpenses = reportDto.TotalExpenses,
                ProfitOrLoss = reportDto.ProfitOrLoss,
                Status = reportDto.Status,
                GeneratedAt = reportDto.GeneratedAt,
                ExpensesByCategory = expensesByCategory
                    .Select(e => new ProfitReportExpense
                    {
                        CategoryId = e.CategoryId,
                        CategoryName = e.CategoryName,
                        TotalAmount = e.TotalAmount
                    }).ToList()
            };

            _db.profitReports.Add(report);
            await _db.SaveChangesAsync();

            return Ok(reportDto);
        }

        [HttpGet("all-reports")]
        public async Task<ActionResult<List<ProfitReportDTO>>> GetAllReports()
        {
            var reports = await _db.profitReports
                .Include(r => r.ExpensesByCategory)
                .OrderByDescending(r => r.GeneratedAt)
                .ToListAsync();

            var reportsDto = reports.Select(r => new ProfitReportDTO
            {
                TotalIncome = r.TotalIncome,
                TotalDebt = r.TotalDebt,
                TotalExpenses = r.TotalExpenses,
                ProfitOrLoss = r.ProfitOrLoss,
                Status = r.Status,
                GeneratedAt = r.GeneratedAt,
                ExpensesByCategory = r.ExpensesByCategory.Select(e => new ExpenseByCategoryDTO
                {
                    CategoryId = e.CategoryId,
                    CategoryName = e.CategoryName,
                    TotalAmount = e.TotalAmount
                }).ToList()
            }).ToList();

            return Ok(reportsDto);
        }
    }

}
