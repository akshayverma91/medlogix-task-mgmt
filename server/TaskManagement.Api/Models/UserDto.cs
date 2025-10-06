namespace TaskManagement.Api.Models
{
    public class UserDto
    {
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string Role { get; set; }
    public DateTime CreatedAt { get; set; }
    }
}
