using TaskManagement.Api.Models;

namespace TaskManagement.Api.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
}