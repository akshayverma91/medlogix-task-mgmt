using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    public required string UserName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public required string Role { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
