using FutureStepsAcademy.Data;
using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace FutureStepsAcademy.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<SalaryController> _logger;

        public SalaryController(ApplicationDbContext db, ILogger<SalaryController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // GET: api/Salary/monthly?month=1&year=2026
        [HttpGet("monthly")]
        public async Task<ActionResult<List<TeacherSalaryStatusDTO>>> GetMonthlySalaries(int month, int year)
        {
            try
            {
                if (month < 1 || month > 12)
                    return BadRequest("Month must be between 1 and 12");

                // Get all teachers
                var teachers = await _db.Teachers.ToListAsync();

                // Get "Salary" category
                var salaryCategory = await _db.Expenses_Category
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == "salary");

                if (salaryCategory == null)
                {
                    // Create salary category if it doesn't exist
                    salaryCategory = new ExpenseCategory { Name = "Salary" };
                    _db.Expenses_Category.Add(salaryCategory);
                    await _db.SaveChangesAsync();
                }

                var result = new List<TeacherSalaryStatusDTO>();

                foreach (var teacher in teachers)
                {
                    // Check if salary was paid for this month/year
                    var salaryExpense = await _db.expenses
                        .Where(e => e.TeacherId == teacher.TeacherID
                                 && e.CategoryId == salaryCategory.Id
                                 && e.ExpenseDate.Month == month
                                 && e.ExpenseDate.Year == year)
                        .FirstOrDefaultAsync();

                    result.Add(new TeacherSalaryStatusDTO
                    {
                        TeacherId = teacher.TeacherID,
                        TeacherName = $"{teacher.FirstName} {teacher.LastName}",
                        MonthlySalary = (decimal)teacher.Salary,
                        IsPaid = salaryExpense != null,
                        PaymentDate = salaryExpense?.ExpenseDate,
                        ExpenseId = salaryExpense?.Id
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting monthly salaries");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        // POST: api/Salary/pay
        [HttpPost("pay")]
        public async Task<IActionResult> PaySalary([FromBody] PaySalaryDTO dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("Invalid data");

                // Get teacher
                var teacher = await _db.Teachers.FindAsync(dto.TeacherId);
                if (teacher == null)
                    return NotFound("Teacher not found");

                // Get "Salary" category
                var salaryCategory = await _db.Expenses_Category
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == "salary");

                if (salaryCategory == null)
                {
                    salaryCategory = new ExpenseCategory { Name = "Salary" };
                    _db.Expenses_Category.Add(salaryCategory);
                    await _db.SaveChangesAsync();
                }

                // Check if already paid for this month
                var existingPayment = await _db.expenses
                    .Where(e => e.TeacherId == dto.TeacherId
                             && e.CategoryId == salaryCategory.Id
                             && e.ExpenseDate.Month == dto.Month
                             && e.ExpenseDate.Year == dto.Year)
                    .FirstOrDefaultAsync();

                if (existingPayment != null)
                    return BadRequest("Salary for this month has already been paid");

                // Create expense record
                var monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dto.Month);
                var expense = new Expense
                {
                    CategoryId = salaryCategory.Id,
                    TeacherId = dto.TeacherId,
                    Amount = (decimal)teacher.Salary,
                    Description = dto.Notes ?? $"Salary for {monthName} {dto.Year}",
                    ExpenseDate = dto.PaymentDate,
                    PaymentMethod = dto.PaymentMethod
                };

                _db.expenses.Add(expense);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Salary payment recorded successfully", expenseId = expense.Id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while paying salary");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        // GET: api/Salary/history/{teacherId}
        [HttpGet("history/{teacherId}")]
        public async Task<ActionResult<List<SalaryPaymentHistoryDTO>>> GetPaymentHistory(int teacherId)
        {
            try
            {
                // Verify teacher exists
                var teacher = await _db.Teachers.FindAsync(teacherId);
                if (teacher == null)
                    return NotFound("Teacher not found");

                // Get "Salary" category
                var salaryCategory = await _db.Expenses_Category
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == "salary");

                if (salaryCategory == null)
                    return Ok(new List<SalaryPaymentHistoryDTO>());

                // Get all salary expenses for this teacher
                var salaryExpenses = await _db.expenses
                    .Where(e => e.TeacherId == teacherId && e.CategoryId == salaryCategory.Id)
                    .OrderByDescending(e => e.ExpenseDate)
                    .ToListAsync();

                var result = salaryExpenses.Select(e => new SalaryPaymentHistoryDTO
                {
                    ExpenseId = e.Id,
                    MonthYear = e.ExpenseDate.ToString("MMMM yyyy"),
                    Amount = e.Amount,
                    PaymentDate = e.ExpenseDate,
                    Description = e.Description ?? ""
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting payment history");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        // POST: api/Salary/bulk-pay
        [HttpPost("bulk-pay")]
        public async Task<IActionResult> BulkPaySalaries([FromBody] BulkPaySalaryDTO dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest("Invalid data");

                // Get all teachers
                var teachers = await _db.Teachers.ToListAsync();

                // Get "Salary" category
                var salaryCategory = await _db.Expenses_Category
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == "salary");

                if (salaryCategory == null)
                {
                    salaryCategory = new ExpenseCategory { Name = "Salary" };
                    _db.Expenses_Category.Add(salaryCategory);
                    await _db.SaveChangesAsync();
                }

                var successCount = 0;
                var skippedCount = 0;
                var failedTeachers = new List<string>();

                foreach (var teacher in teachers)
                {
                    try
                    {
                        // Check if already paid for this month
                        var existingPayment = await _db.expenses
                            .Where(e => e.TeacherId == teacher.TeacherID
                                     && e.CategoryId == salaryCategory.Id
                                     && e.ExpenseDate.Month == dto.Month
                                     && e.ExpenseDate.Year == dto.Year)
                            .FirstOrDefaultAsync();

                        if (existingPayment != null)
                        {
                            skippedCount++;
                            continue;
                        }

                        // Create expense record
                        var monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dto.Month);
                        var expense = new Expense
                        {
                            CategoryId = salaryCategory.Id,
                            TeacherId = teacher.TeacherID,
                            Amount = (decimal)teacher.Salary,
                            Description = dto.Notes ?? $"Salary for {monthName} {dto.Year}",
                            ExpenseDate = dto.PaymentDate,
                            PaymentMethod = dto.PaymentMethod
                        };

                        _db.expenses.Add(expense);
                        successCount++;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Error paying salary for teacher {teacher.TeacherID}");
                        failedTeachers.Add($"{teacher.FirstName} {teacher.LastName}");
                    }
                }

                await _db.SaveChangesAsync();

                return Ok(new
                {
                    message = "Bulk payment completed",
                    successCount,
                    skippedCount,
                    failedCount = failedTeachers.Count,
                    failedTeachers
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while processing bulk payment");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }
    }
}
