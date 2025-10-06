using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.Models;

public class RegisterRequest
{
    [Required]
    public required string UserName { get; set; }

    [Required]
    public required string Password { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }
}