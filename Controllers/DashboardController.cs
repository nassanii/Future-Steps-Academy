using FutureStepsAcademy.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(
        ApplicationDbContext context,
        ILogger<DashboardController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // 1) SHARED STATISTICS  (Admin + Teacher)

    [HttpGet("statistics/basic")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult> GetBasicStatistics()
    {
        try
        {
            var now = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(now.Year, now.Month, 1);

            var studentRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Student");
            var teacherRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Teacher");

            if (studentRole == null || teacherRole == null)
                return BadRequest(new { message = "Roles not found in the system" });

            var totalStudents = await _context.UserRoles
                .Where(ur => ur.RoleId == studentRole.Id)
                .CountAsync();

            var totalTeachers = await _context.UserRoles
                .Where(ur => ur.RoleId == teacherRole.Id)
                .CountAsync();

            var totalCourses = await _context.Courses.CountAsync();

            var newStudentsThisMonth = await _context.UserRoles
                .Where(ur => ur.RoleId == studentRole.Id)
                .Join(_context.Users,
                      ur => ur.UserId,
                      u => u.Id,
                      (ur, u) => u)
                .Where(u => u.CreatedAt >= firstDayOfMonth)
                .CountAsync();

            return Ok(new
            {
                totalStudents,
                totalTeachers,
                totalCourses,
                newStudentsThisMonth,
                generatedAt = now
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving basic statistics");
            return StatusCode(500, new { message = "Error retrieving statistics" });
        }
    }


    // 2) ADMIN-ONLY STATISTICS (Finance Data)

    [HttpGet("statistics/finance")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> GetFinanceStatistics()
    {
        try
        {
            var now = DateTime.UtcNow;

            // Total Expenses
            var totalExpenses = await _context.expenses
                .SumAsync(e => (decimal?)e.Amount) ?? 0;

            // Total Payments
            var totalPayments = await _context.Payments
                .SumAsync(p => (decimal?)p.Amount) ?? 0;

            // Total Profits
            var totalProfits = totalPayments - totalExpenses;

            return Ok(new
            {
                totalExpenses,
                totalPayments,
                totalProfits,
                generatedAt = now
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving finance statistics");
            return StatusCode(500, new { message = "Error retrieving finance statistics" });
        }
    }
}
