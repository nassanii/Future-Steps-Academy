using AutoMapper;
using FutureStepsAcademy.API.Models;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.API.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]

    [ApiController]
    public class ExpenseCategoryController : ControllerBase
    {
        private readonly IExpenseCategoryService _expenseCategoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<ExpenseCategoryController> _logger;

        public ExpenseCategoryController(IExpenseCategoryService expenseCategoryService, IMapper mapper, ILogger<ExpenseCategoryController> logger)
        {
            this._expenseCategoryService = expenseCategoryService;
            this._mapper = mapper;
            this._logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseCategoryDTO expenseCategoryDTO)
        {

            if (expenseCategoryDTO == null)
                return BadRequest(nameof(expenseCategoryDTO));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var domain = _mapper.Map<ExpenseCategory>(expenseCategoryDTO);


            await _expenseCategoryService.AddExpenseCategory(domain);


            var category = await _expenseCategoryService.GetExpenseCategoryById(domain.Id);

            if (category == null)
                return NotFound();


            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var expenseCategories = await _expenseCategoryService.GetAllExpenseCategory();
            var expenseCategoryDTOs = _mapper.Map<List<ExpenseCategoryDTO>>(expenseCategories);
            return Ok(expenseCategoryDTOs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id == 0)
                throw new ArgumentException(nameof(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var expenseCategory = await _expenseCategoryService.GetExpenseCategoryById(id);
                if (expenseCategory == null)
                    return NotFound();

                var expenseCategoryDTO = _mapper.Map<ExpenseCategoryDTO>(expenseCategory);
                return Ok(expenseCategoryDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating expense category with {id}", id);
                return StatusCode(500, "An error occurred");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ExpenseCategoryDTO expenseCategoryDTO)
        {
            if (expenseCategoryDTO == null)
                throw new ArgumentNullException(nameof(expenseCategoryDTO));

            if (id == 0)
                throw new ArgumentNullException(nameof(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingExpenseCategory = await _expenseCategoryService.GetExpenseCategoryById(id);
                if (existingExpenseCategory == null)
                    return NotFound();

                var domain = _mapper.Map<ExpenseCategory>(expenseCategoryDTO);
                await _expenseCategoryService.UpdateExpenseCategory(id, domain);

                var updatedObject = await _expenseCategoryService.GetExpenseCategoryById(id);
                return Ok(updatedObject);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error updating expense category with ID {Id}", id);
                return StatusCode(500, "An error occurred while updating the expense category.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new ArgumentNullException(nameof(id));


            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var existingExpenseCategory = await _expenseCategoryService.GetExpenseCategoryById(id);
                if (existingExpenseCategory == null)
                    return NotFound();

                await _expenseCategoryService.DeleteExpenseCategoryById(existingExpenseCategory);
                return Ok(existingExpenseCategory);
            }
            catch (Exception ex)

            {
                _logger.LogError(ex, "Error updating expense category with ID {Id}", id);
                return StatusCode(500, "An error occurred while updating the expense category.");
            }
        }
    }
}