namespace FutureStepsAcademy.API.Models.DTOs
{
    public class StudentCourseGradesDTO
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public int CourseID { get; set; }
        public string CourseName { get; set; }
        public List<GradeDTO> Grades { get; set; }
        public decimal? Average { get; set; }
    }
}
