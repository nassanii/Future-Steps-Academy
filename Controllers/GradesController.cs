using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.API.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin,Teacher")]
    [Route("api/[controller]")]
    public class GradesController : ControllerBase
    {
        private readonly IGradeService _gradeService;
        private readonly IMapper _mapper;

        public GradesController(IGradeService gradeService, IMapper mapper)
        {
            _gradeService = gradeService;
            _mapper = mapper;
        }

        // GET: api/grades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeDTO>>> GetAllGrades()
        {
            var grades = await _gradeService.GetAllGradesAsync();
            var gradeDtos = _mapper.Map<IEnumerable<GradeDTO>>(grades);
            return Ok(gradeDtos);
        }

        // GET: api/grades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeDTO>> GetGrade(int id)
        {
            var grade = await _gradeService.GetGradeByIdAsync(id);

            if (grade == null)
                return NotFound(new { message = $"Grade with ID {id} not found" });

            var gradeDto = _mapper.Map<GradeDTO>(grade);
            return Ok(gradeDto);
        }

        // GET: api/grades/student/5
        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<IEnumerable<GradeDTO>>> GetStudentGrades(int studentId)
        {
            var grades = await _gradeService.GetStudentGradesAsync(studentId);
            var gradeDtos = _mapper.Map<IEnumerable<GradeDTO>>(grades);
            return Ok(gradeDtos);
        }

        // GET: api/grades/course/5
        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<GradeDTO>>> GetCourseGrades(int courseId)
        {
            var grades = await _gradeService.GetCourseGradesAsync(courseId);
            var gradeDtos = _mapper.Map<IEnumerable<GradeDTO>>(grades);
            return Ok(gradeDtos);
        }

        // GET: api/grades/student/5/course/3
        [HttpGet("student/{studentId}/course/{courseId}")]
        public async Task<ActionResult<StudentCourseGradesDTO>> GetStudentCourseGrades(int studentId, int courseId)
        {
            var grades = await _gradeService.GetStudentCourseGradesAsync(studentId, courseId);
            var average = await _gradeService.GetCourseAverageAsync(studentId, courseId);

            if (!grades.Any())
                return NotFound(new { message = "No grades found for this student-course combination" });

            var firstGrade = grades.First();

            var result = new StudentCourseGradesDTO
            {
                StudentID = studentId,
                StudentName = firstGrade.Student != null
                    ? $"{firstGrade.Student.FirstName} {firstGrade.Student.LastName}"
                    : "N/A",
                CourseID = courseId,
                CourseName = firstGrade.Course?.courseName ?? "N/A",
                Grades = _mapper.Map<List<GradeDTO>>(grades),
                Average = average
            };

            return Ok(result);
        }

        // POST: api/grades
        [HttpPost]
        public async Task<ActionResult<GradeDTO>> CreateGrade([FromBody] CreateGradeDTO createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var grade = await _gradeService.CreateGradeAsync(
                    createDto.StudentID,
                    createDto.CourseID,
                    createDto.GradeType,
                    createDto.Score
                );

                var gradeDto = _mapper.Map<GradeDTO>(grade);

                return CreatedAtAction(
                    nameof(GetGrade),
                    new { id = grade.GradeID },
                    gradeDto
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        // PUT: api/grades/5
        [HttpPut("{id}")]
        public async Task<ActionResult<GradeDTO>> UpdateGrade(int id, [FromBody] UpdateGradeDTO updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var grade = await _gradeService.UpdateGradeAsync(id, updateDto.Score);

                if (grade == null)
                    return NotFound(new { message = $"Grade with ID {id} not found" });

                var gradeDto = _mapper.Map<GradeDTO>(grade);
                return Ok(gradeDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/grades/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGrade(int id)
        {
            var result = await _gradeService.DeleteGradeAsync(id);

            if (!result)
                return NotFound(new { message = $"Grade with ID {id} not found" });

            return NoContent();
        }
    }
}
