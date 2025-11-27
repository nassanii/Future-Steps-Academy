

using System.ComponentModel.DataAnnotations;

namespace FutureStepsAcademy.API.Models.DTOs;

public class UpdateStatusDto
{
    [Required]
    [StringLength(20)]
    public string Status { get; set; }
}