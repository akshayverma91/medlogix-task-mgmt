using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.Models;
using TaskManagement.Api.Services;

namespace TaskManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
                _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.RegisterAsync(request);
            if (user == null)
            {
                    return BadRequest(new { message = "User registration failed" });
            }

            var userDto = new UserDto
            {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
            };

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
                if (!ModelState.IsValid)
                {
                        return BadRequest(ModelState);
                }

                var response = await _authService.LoginAsync(request);
                if (response == null)
                {
                        return Unauthorized(new { message = "Invalid credentials" });
                }

                return Ok(response);
        }
}