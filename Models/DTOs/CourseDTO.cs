namespace FutureStepsAcademy.API.Models.DTOs
{
    public class CourseDTO
    {
        public int CourseID { get; set; }
        public string courseName { get; set; }
        public string CourseCode { get; set; }

        //  list of the students 
        public List<SimpleStudentDTO> students { get; set; } = new List<SimpleStudentDTO>();

        // list  of the Teachers 
        public List<SimpleTeacherDTO> teachers { get; set; } = new List<SimpleTeacherDTO>();

        // list of the departments 
        public List<SimpleDepartmentDTO> departmenters { get; set; } = new List<SimpleDepartmentDTO>();
    }
}
