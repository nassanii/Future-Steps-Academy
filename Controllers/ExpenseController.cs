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
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IMapper _mapper;
        private readonly ILogger<ExpenseController> _logger;

        public ExpenseController(IExpenseService expenseService, IMapper mapper, ILogger<ExpenseController> logger)
        {
            this._expenseService = expenseService;
            this._mapper = mapper;
            this._logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExpenseDTO expenseDTO)
        {
            if (expenseDTO == null)
                throw new ArgumentNullException(nameof(expenseDTO));

            try
            {

                var DomianExpense = _mapper.Map<Expense>(expenseDTO);
                await _expenseService.AddExpense(DomianExpense);

                var ExpenseDTO = _mapper.Map<ExpenseDTO>(DomianExpense);
                return CreatedAtAction(nameof(Get), new { id = ExpenseDTO.Id }, ExpenseDTO);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error While Adding A Expense");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }

        }

        [HttpGet]
        public async Task<ActionResult> GetAll(int? TeacherId, int? CategoryId)
        {
            try
            {
                var expenses = await _expenseService.GetAllExpense(TeacherId, CategoryId);
                var expensesDTO = _mapper.Map<List<ExpenseDTO>>(expenses);
                return Ok(expensesDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error Wihle Gitting the Expenses");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var Expense = await _expenseService.GetById(id);
                var ExpenseDTO = _mapper.Map<ExpenseDTO>(Expense);
                return Ok(ExpenseDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while Gitting the The Expese");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new ArgumentException(nameof(id));

            try
            {
                await _expenseService.DeleteById(id);
                return Ok("the Object is Deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error Wihle Deleting The Expense");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateExpenseDTO updateExpenseDTO)
        {
            if (id == 0)
                throw new ArgumentException(nameof(id));

            if (updateExpenseDTO == null)
                throw new ArgumentNullException(nameof(updateExpenseDTO));

            try
            {
                var DominExpense = _mapper.Map<Expense>(updateExpenseDTO);
                await _expenseService.Update(id, DominExpense);

                var ResultDTO = _mapper.Map<ExpenseDTO>(DominExpense);
                return Ok(ResultDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error While Updating Expense");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");

            }

        }

    }
}
