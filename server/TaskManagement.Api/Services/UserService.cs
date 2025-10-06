using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Models;
using TaskManagement.Api.Repositories;

namespace TaskManagement.Api.Services;

public class UserService : IUserService
{
    private readonly TaskDbContext _context;

    public UserService(TaskDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users
            .Select(u => new User
            {
                Id = u.Id,
                UserName = u.UserName,
                Role = u.Role,
                Email = u.Email
            })
            .ToListAsync();
    }
}