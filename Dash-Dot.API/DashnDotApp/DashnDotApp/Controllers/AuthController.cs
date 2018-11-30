using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
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
        public IActionResult Register(UserForRegisterDto userForRegisterDto)
        {


            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

            if (_repo.UserExists(userForRegisterDto.Email))
                return BadRequest("Υπάρχει ήδη λογαριασμός με αυτό το E-mail!");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

            return CreatedAtRoute("Get User", new { controller = "Users", id = createdUser.Id }, userToReturn);

        }




        [HttpPost("login")]
        public IActionResult Login(UserForLoginDto userForLoginDto)
        {

            try
            {
                var userFromRepo = _repo.Login(userForLoginDto.Email.ToLower(), userForLoginDto.Password);

                if (userFromRepo == null)
                    return Unauthorized();

                var claims = new List<Claim>();

                claims.Add(new Claim("Id", userFromRepo.Id.ToString()));
                claims.Add(new Claim("isAdmin", userFromRepo.IsAdmin.ToString()));
                claims.Add(new Claim("firstName", userFromRepo.FirstName));

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Tokens:Key").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var token = new JwtSecurityToken(
                                _config.GetSection("Tokens:Issuer").Value,
                               _config.GetSection("Tokens:Issuer").Value,
                                  claims,
                                  expires: DateTime.UtcNow.AddMinutes(560),
                                  signingCredentials: creds);

                var tokenHandler = new JwtSecurityTokenHandler();



                return Ok(new
                {
                    token = tokenHandler.WriteToken(token)
                });
            }
            catch
            {
                throw new Exception("Κάτι πήγε στραβά");
            }


        }
    }

}





