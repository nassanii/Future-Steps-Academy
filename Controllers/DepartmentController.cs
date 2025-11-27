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
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmaentService _departmaentService;
        private readonly IMapper _mapper;

        public DepartmentController(IDepartmaentService departmaentService, IMapper mapper)
        {
            _departmaentService = departmaentService;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddDepartmentRequestDTO addDepartmentRequestDTO)
        {
            // mapping the DTO to domain Model
            var DomainDepartment = _mapper.Map<Department>(addDepartmentRequestDTO);

            await _departmaentService.AddDepartment(DomainDepartment);

            var CreatedDepartment = await _departmaentService.GetDepartmentById(DomainDepartment.DepartmentID);

            // mapping Domian to DTO 
            var DepartmentDTO = _mapper.Map<DepartmentDTO>(CreatedDepartment);

            return Ok(DepartmentDTO);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departmentsDomain = await _departmaentService.GetAllDepartment();
            if (departmentsDomain == null)
            {
                return NotFound();
            }
            // mapping the Domain to DTO 
            return Ok(_mapper.Map<List<GetAllDepartmentsDTO>>(departmentsDomain));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var DepartnemtDomain = await _departmaentService.GetDepartmentById(id);
            if (DepartnemtDomain == null)
            {
                return NotFound();
            }
            // Mapping Domian To DTO 
            return Ok(_mapper.Map<DepartmentDTO>(DepartnemtDomain));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromBody] UpdateDepartmentDTO updateDepartmentDTO, int id)
        {
            var DepartmentDomin = await _departmaentService.GetDepartmentById(id);
            // mapping Domian To DTO
            _mapper.Map(updateDepartmentDTO, DepartmentDomin);

            await _departmaentService.UpdateDepartment(id, updateDepartmentDTO);

            // mapping 
            var DepartmentDTO = _mapper.Map<DepartmentDTO>(DepartmentDomin);
            return Ok(DepartmentDTO);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var Departnemt = await _departmaentService.GetDepartmentById(id);
            await _departmaentService.DeleteDepartment(Departnemt);

            return Ok(_mapper.Map<DepartmentDTO>(Departnemt));
        }



    }
}
