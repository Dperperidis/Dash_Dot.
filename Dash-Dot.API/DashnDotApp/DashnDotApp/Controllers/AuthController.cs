using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private SqlContext _ctx;
        public IConfiguration _config { get; }


        public AuthController(IAuthRepository repo, IConfiguration config, SqlContext ctx, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
            _ctx = ctx;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Email))
                return BadRequest("There is already an account with this email");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            //var userToReturn = _mapper.Map<UserForRegisterDto>(createdUser);

            return Ok(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Email.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userForLoginDto.Email),
                new Claim("isAdmin", userFromRepo.IsAdmin.ToString()),
                new Claim("firstname", userFromRepo.FirstName)


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

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }

    
}
