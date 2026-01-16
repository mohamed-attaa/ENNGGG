using ArchitectToolkit.API.Data;
using ArchitectToolkit.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectToolkit.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            if (_context.Users.Any(x => x.Email == dto.Email))
                return BadRequest("Email already exists");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Registered successfully");
        }

        [HttpPost("login")]
        public IActionResult Login(RegisterDto dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized();

            return Ok(new { user.Id, user.FullName, user.Email });
        }
    }
}
