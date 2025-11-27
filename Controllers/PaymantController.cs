using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Data;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Models.DTOs;
using FutureStepsAcademy.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin,Teacher")]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentController> _logger;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _db;

        public PaymentController(IPaymentService paymentService, ILogger<PaymentController> logger, IMapper mapper, ApplicationDbContext db)
        {
            _paymentService = paymentService;
            _logger = logger;
            _mapper = mapper;
            this._db = db;
        }

        // POST: api/payment
        [HttpPost]
        public async Task<IActionResult> AddPayment([FromBody] CreatePayementDTO createPayementDTO)
        {
            if (createPayementDTO == null)
                return BadRequest("Payment data is required.");




            var invoice = await _db.invoices.FindAsync(createPayementDTO.InvoiceId);
            if (invoice == null)
                return NotFound($"Invoice with ID {createPayementDTO.InvoiceId} not found.");

            if (createPayementDTO.Amount <= 0)
                return BadRequest("Payment amount must be greater than zero.");

            // update invoice balance
            invoice.Balance -= createPayementDTO.Amount;

            if (invoice.Balance <= 0)
            {
                invoice.Status = "Paid";
                invoice.Balance = 0;
            }
            else if (invoice.Balance < invoice.TotalAmount)
            {
                invoice.Status = "PartiallyPaid";
            }
            else
            {
                invoice.Status = "Unpaid";
            }

            await _db.SaveChangesAsync();
            // Map DTO to entity
            var payment = _mapper.Map<Payment>(createPayementDTO);
            var createdPayment = await _paymentService.AddPaymentAsync(payment);
            var paymentDTO = _mapper.Map<PaymantDTO>(createdPayment);

            return Ok(paymentDTO);
        }

        // GET: api/payment/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
                return NotFound();

            var paymentDTO = _mapper.Map<PaymantDTO>(payment);
            return Ok(paymentDTO);
        }

        // GET: api/payment
        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _paymentService.GetAllPaymentsAsync();
            var paymentDTOs = _mapper.Map<IEnumerable<PaymantDTO>>(payments);
            return Ok(paymentDTOs);
        }

        // PUT: api/payment/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymantDTO paymantDTO)
        {
            if (paymantDTO == null)
                return BadRequest("Payment data is required.");

            var payment = _mapper.Map<Payment>(paymantDTO);
            await _paymentService.UpdatePaymentAsync(id, payment);

            return NoContent();
        }
    }
}
