using AutoMapper;
using FutureStepsAcademy.API.Models.DTOs;
using FutureStepsAcademy.Models;
using FutureStepsAcademy.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FutureStepsAcademy.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly ILogger<InvoicesController> _logger;
        private readonly IMapper _mapper;

        public InvoicesController(IInvoiceService invoiceService, ILogger<InvoicesController> logger, IMapper mapper)
        {
            _invoiceService = invoiceService;
            _logger = logger;
            _mapper = mapper;
        }



        // POST: api/invoices
        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Manual mapping DTO to Domain
                var domainInvoice = MapCreateDtoToEntity(dto);

                var createdInvoice = await _invoiceService.CreateInvoice(domainInvoice);

                // Manual mapping Domain to DTO
                var responseDto = MapEntityToDto(createdInvoice);

                return CreatedAtAction(nameof(GetInvoice), new { id = responseDto.Id }, responseDto);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "Null argument provided for invoice creation");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating invoice");
                return StatusCode(500, "An error occurred while creating the invoice.");
            }
        }


        // GET: api/invoices/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            try
            {
                var invoice = await _invoiceService.GetInvoiceDetails(id);
                var invoiceDto = _mapper.Map<InvoiceDto>(invoice);
                if (invoice == null)
                    return NotFound($"Invoice with ID {id} not found.");

                return Ok(invoiceDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving invoice {InvoiceId}", id);
                return StatusCode(500, "An error occurred while retrieving the invoice.");
            }
        }

        // GET: api/invoices
        [HttpGet]
        public async Task<IActionResult> GetAllInvoices()
        {
            try
            {
                var invoices = await _invoiceService.GetAllInvoicesWithDetails();
                var invoiceDTO = _mapper.Map<List<InvoiceDto>>(invoices);

                return Ok(invoiceDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all invoices");
                return StatusCode(500, "An error occurred while retrieving invoices.");
            }
        }

        // GET: api/invoices/student/{studentId}
        [HttpGet("student/{studentId:int}")]
        public async Task<IActionResult> GetInvoicesByStudent(int studentId)
        {
            try
            {
                var invoices = await _invoiceService.GetInvoicesByStudentId(studentId);

                var invoiceDtos = _mapper.Map<List<InvoiceDto>>(invoices);

                return Ok(invoiceDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving invoices for student {StudentId}", studentId);
                return StatusCode(500, "An error occurred while retrieving student invoices.");
            }
        }

        // GET: api/invoices/status/{status}
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetInvoicesByStatus(string status)
        {
            try
            {
                var invoices = await _invoiceService.GetInvoicesByStatus(status);
                var invoicesDTO = _mapper.Map<List<InvoiceDto>>(invoices);
                return Ok(invoicesDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving invoices by status {Status}", status);
                return StatusCode(500, "An error occurred while retrieving invoices by status.");
            }
        }

        // GET: api/invoices/overdue
        [HttpGet("overdue")]
        public async Task<IActionResult> GetOverdueInvoices()
        {
            try
            {
                var invoices = await _invoiceService.GetOverdueInvoices(DateTime.UtcNow);
                var invoicesDTO = _mapper.Map<List<InvoiceDto>>(invoices);
                return Ok(invoicesDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving overdue invoices");
                return StatusCode(500, "An error occurred while retrieving overdue invoices.");
            }
        }

        // PUT: api/invoices/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] UpdateInvoiceDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var invoice = new Invoice
                {
                    TotalAmount = dto.TotalAmount,
                    Balance = dto.Balance,
                    Status = dto.Status,
                    IssueDate = dto.IssueDate,
                    DueDate = dto.DueDate
                };

                var updatedInvoice = await _invoiceService.UpdateInvoice(id, invoice);
                return Ok(updatedInvoice);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating invoice {InvoiceId}", id);
                return StatusCode(500, "An error occurred while updating the invoice.");
            }
        }

        // PUT: api/invoices/{id}/status
        [HttpPut("{id:int}/status")]
        public async Task<IActionResult> UpdateInvoiceStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updatedInvoice = await _invoiceService.UpdateInvoiceStatus(id, dto.Status);
                return Ok(updatedInvoice);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating invoice status for invoice {InvoiceId}", id);
                return StatusCode(500, "An error occurred while updating invoice status.");
            }
        }

        // DELETE: api/invoices/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            try
            {
                var Invoice = await _invoiceService.GetInvoiceDetails(id);



                var deleted = await _invoiceService.DeleteInvoice(id);
                if (!deleted)
                    return NotFound($"Invoice with ID {id} not found.");

                return Ok(deleted);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting invoice {InvoiceId}", id);
                return StatusCode(500, "An error occurred while deleting the invoice.");
            }
        }





        // Manual mapping methods
        private Invoice MapCreateDtoToEntity(CreateInvoiceDto dto)
        {
            var invoice = new Invoice
            {
                StudentId = dto.StudentId,
                InvoiceNo = dto.InvoiceNo,
                IssueDate = dto.IssueDate ?? DateTime.UtcNow,
                DueDate = dto.DueDate,
                Status = "Issued"
            };

            // Map invoice items and calculate total
            if (dto.Items != null && dto.Items.Any())
            {
                foreach (var itemDto in dto.Items)
                {
                    invoice.InvoiceItems.Add(new InvoiceItem
                    {
                        Description = itemDto.Description,
                        Amount = itemDto.Amount
                    });
                }

                invoice.TotalAmount = dto.Items.Sum(i => i.Amount);
            }
            else
            {
                invoice.TotalAmount = 0;
            }

            // Map payments and calculate balance
            decimal totalPayments = 0;
            if (dto.paymant != null && dto.paymant.Any())
            {
                foreach (var paymentDto in dto.paymant)
                {
                    var payment = new Payment
                    {
                        Amount = paymentDto.Amount,
                        PaymentDate = paymentDto.PaymentDate ?? DateTime.UtcNow,
                        Description = paymentDto.Description,
                        PaymentType = paymentDto.PaymentType,
                        Method = paymentDto.Method
                    };
                    invoice.Payments.Add(payment);
                    totalPayments += paymentDto.Amount;
                }
            }

            // CRITICAL: Calculate balance and determine status
            invoice.Balance = invoice.TotalAmount - totalPayments;

            // Determine status based on payments
            if (invoice.TotalAmount == 0)
            {
                invoice.Status = "Issued";
            }
            else if (totalPayments >= invoice.TotalAmount)
            {
                invoice.Status = "Paid";
                invoice.Balance = 0; // Ensure no negative balance
            }
            else if (totalPayments > 0)
            {
                invoice.Status = "PartiallyPaid";
            }
            else
            {
                invoice.Status = "Issued";
            }

            return invoice;
        }

        private InvoiceDto MapEntityToDto(Invoice invoice)
        {
            return new InvoiceDto
            {
                Id = invoice.Id,
                StudentId = invoice.StudentId,
                StudentName = invoice.Student?.FirstName + invoice.Student?.LastName, // Include student name if loaded
                InvoiceNo = invoice.InvoiceNo,
                IssueDate = invoice.IssueDate,
                DueDate = invoice.DueDate,
                TotalAmount = invoice.TotalAmount,
                Balance = invoice.Balance,
                Status = invoice.Status,
                Items = invoice.InvoiceItems?.Select(item => new InvoiceItemDto
                {
                    Description = item.Description,
                    Amount = item.Amount
                }).ToList() ?? new List<InvoiceItemDto>(),
                Payments = invoice.Payments?.Select(payment => new PaymantDTO
                {
                    InvoiceId = invoice.Id,
                    Amount = payment.Amount,
                    PaymentDate = payment.PaymentDate,
                    Description = payment.Description,
                    PaymentType = payment.PaymentType,
                    Method = payment.Method
                }).ToList() ?? new List<PaymantDTO>()
            };
        }
    }
}