namespace FutureStepsAcademy.API.Models.DTOs
{
    public class GradeDTO
    {
        public int GradeID { get; set; }
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public int CourseID { get; set; }
        public string CourseName { get; set; }
        public string GradeType { get; set; }
        public decimal Score { get; set; }
        public DateTime? DateRecorded { get; set; }
    }
}
