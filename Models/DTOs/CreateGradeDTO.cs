using FutureStepsAcademy.Models;

namespace FutureStepsAcademy.API.Models.DTOs
{
    public class CreateGradeDTO
    {
        public int StudentID { get; set; }
        public int CourseID { get; set; }
        public GradeType GradeType { get; set; }
        public decimal Score { get; set; }
    }
}
