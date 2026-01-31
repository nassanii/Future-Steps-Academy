using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Models.DTOs;
using FutureStepsAcademy.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentservice;
        private readonly IMapper _mapper;

        public StudentController(IStudentService studentService, IMapper mapper)
        {
            _studentservice = studentService;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var DomainStudent = await _studentservice.GetAllStudents();
            var reponseDTO = _mapper.Map<List<GetAllStdentDTO>>(DomainStudent);
            return Ok(reponseDTO);
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var DomainStudent = await _studentservice.GetStudentById(id);
            if (DomainStudent == null)
            {
                return NotFound();
            }
            // Domin Model To DTO
            var StudentResponse = _mapper.Map<StudentDTO>(DomainStudent);
            return Ok(StudentResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddStudentRequestDTO addStudentRequestDTO)
        {
            // DTO to Domain Model
            var DomainStudent = _mapper.Map<Student>(addStudentRequestDTO);

            if (addStudentRequestDTO.CourseIDs != null && addStudentRequestDTO.CourseIDs.Any())
            {
                foreach (var courseId in addStudentRequestDTO.CourseIDs)
                {
                    DomainStudent.student_Courses.Add(new Student_Course
                    {
                        CourseID = courseId
                    });
                }
            }

            await _studentservice.AddStudent(DomainStudent);
            // Domain Model To DTO
            var studentDto = _mapper.Map<StudentDTO>(DomainStudent);

            return CreatedAtAction(nameof(GetById), new { id = studentDto.StudentID }, studentDto);
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateStudentRequestDTO updateStudentRequestDTO)
        {
            await _studentservice.UpdateStudent(id, updateStudentRequestDTO);

            // Get updated student with all related data
            var updatedStudent = await _studentservice.GetStudentById(id);

            if (updatedStudent == null)
                return NotFound();

            // Domain to DTO Model
            var studentDTO = _mapper.Map<StudentDTO>(updatedStudent);

            return Ok(studentDTO);
        }


        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var StudentFromDB = await _studentservice.GetStudentById(id);
            await _studentservice.DeleteStudent(StudentFromDB);
            return Ok(_mapper.Map<StudentDTO>(StudentFromDB));
        }

    }





}



