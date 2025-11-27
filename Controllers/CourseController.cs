using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseSevice _courseSevice;
        private readonly IMapper _mapper;

        public CourseController(ICourseSevice courseSevice, IMapper mapper)
        {
            this._courseSevice = courseSevice;
            this._mapper = mapper;
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] AddCourseRequestDTO addCourseRequestDTO)
        {
            if (addCourseRequestDTO == null)
                throw new ArgumentNullException(nameof(addCourseRequestDTO));

            try
            {
                // mapping the DTO to the domian model 
                var domianCourse = _mapper.Map<Course>(addCourseRequestDTO);
                await _courseSevice.AddCourse(domianCourse);
                // mapping the Domian to the DTO
                return Ok(_mapper.Map<CourseDTO>(domianCourse));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]

        public async Task<IActionResult> GetAll()
        {
            var coursesDomain = await _courseSevice.GetAllCourses();
            // mapping the Domin to DTO 
            var coursesDTO = _mapper.Map<List<CourseDTO>>(coursesDomain);
            return Ok(coursesDTO);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _courseSevice.GetCourseById(id);
            // mapping domian to DTO 
            var courseDTO = _mapper.Map<CourseDTO>(course);
            return Ok(courseDTO);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromBody] UpdateCourseRequestDTO updateCourseRequestDTO, int id)
        {
            var Course = await _courseSevice.GetCourseById(id);
            // mapping the Domian to UpdateCourseDTO
            _mapper.Map(updateCourseRequestDTO, Course);
            await _courseSevice.UpdateCourse(Course);
            // mappin domin to DTO 
            return Ok(_mapper.Map<CourseDTO>(Course));
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var Course = await _courseSevice.GetCourseById(id);
            await _courseSevice.DeleteCourse(Course);
            // mapping Domain to DTO 
            return Ok(_mapper.Map<CourseDTO>(Course));

        }

    }
}
