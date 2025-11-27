using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherSevice;
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public TeacherController(ITeacherService teacherSevice, ApplicationDbContext db, IMapper mapper)
        {
            this._teacherSevice = teacherSevice;
            this._db = db;
            this._mapper = mapper;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddTeacherRequestDTO addTeacherRequestDTO)
        {
            // // Mapping DTO to the domain Model 
            var DomainTeacher = _mapper.Map<Teacher>(addTeacherRequestDTO);

            // Adding the Teacher 
            await _teacherSevice.AddTeacher(DomainTeacher);


            var TeacherFromDb = await _teacherSevice.GetTeacherById(DomainTeacher.TeacherID);

            // Mapping the domain to the DTO 
            var TeacherDTO = _mapper.Map<TeacherDTO>(TeacherFromDb);

            return CreatedAtAction(nameof(GetById), new { id = TeacherDTO.TeacherID }, TeacherDTO);

        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var DomainTeacher = await _teacherSevice.GetAllTeachers();
            var TeacherDTO = _mapper.Map<List<GetAllTeacherDTO>>(DomainTeacher);
            return Ok(TeacherDTO);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var DominTeacher = await _teacherSevice.GetTeacherById(id);

            if (DominTeacher == null) { return NotFound(); }
            // mapping the domain model to the DTO response 
            var TeacherDTO = _mapper.Map<TeacherDTO>(DominTeacher);
            return Ok(TeacherDTO);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTeacherRequestDTO updateTeacherRequestDTO)
        {
            // update the data
            await _teacherSevice.UpdateTreacher(id, updateTeacherRequestDTO);

            // get data after updated 
            var updatedTeacherWithCourses = await _teacherSevice.GetTeacherById(id);
            var TeacherDTO = _mapper.Map<TeacherDTO>(updatedTeacherWithCourses);
            return Ok(TeacherDTO);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var TeacherFromDB = await _teacherSevice.GetTeacherById(id);

            if (TeacherFromDB == null) { return NotFound(); }

            await _teacherSevice.DeleteTeacher(TeacherFromDB);

            // map the Domain model to DTO
            return Ok(_mapper.Map<TeacherDTO>(TeacherFromDB));
        }

    }
}
