using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Landmark.API.Data;
using Landmark.API.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Landmark.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AuthController(ILogger<AuthController> logger, IAuthRepository repo, IConfiguration config, IMapper mapper, DataContext context)
        {
            _logger = logger;
            _mapper = mapper;
            _config = config;
            _repo = repo;
            _context = context;
        }

        /// <summary>
        /// Login to system with credentials that return user objects with token
        /// </summary>
        /// <param name="userForLoginDto"></param>
        /// <returns>user, token</returns>
        //api/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {

            var userFromRepo = await _repo.Login(userForLoginDto);

            if (userFromRepo == null)
                return Unauthorized("Unauthorized User!");
            var claims = new[]
               {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.UserID.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Email)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            _context.Entry(userFromRepo).State = EntityState.Modified;
            userFromRepo.LastLogin = DateTime.Now;

            var user = _mapper.Map<UserForDetailedDto>(userFromRepo);

            //code for update user last login
            try
            {
                _context.Update(userFromRepo);
                var save = await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex.Message);
                // throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user,
            });
        }
    }
}
