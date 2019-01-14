using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{


    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _repo;
        private SqlContext _ctx;
        public int UserForDetailedDto { get; private set; }

        public UsersController(IMapper mapper, SqlContext ctx, IAuthRepository repo)
        {
          _mapper = mapper;
            _ctx = ctx;
            _repo = repo;
        }
        
        [HttpGet("{id}", Name = "Get User")]
        public IActionResult GetUser(string id)
        {
            var user = _ctx.Users.FirstOrDefault(u => u.Id == id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpGet("getUsers")]
        public IActionResult GetUsers()
        {
            try
            {

                var users = _ctx.Users.ToList().OrderBy(x=>x.FirstName);

                return Ok(users);

            }
            catch (Exception ex)
            {
                return BadRequest("Δεν ήταν δυνατή η εμφάνιση των πελατών");
            }

        }


        [Route("updateUser")]
        [HttpPut]
        public IActionResult UpdateUser([FromBody]UserForUpdateDto userForUpdateDto)
        {
            try
            {

                var userFromRepo =  _repo.GetUser(userForUpdateDto.Id);

               
              var temp =  _mapper.Map(userForUpdateDto, userFromRepo);

                var result = _ctx.Users.Update(temp);
                _ctx.SaveChanges();
                return Ok(result.Entity);

            }catch (Exception ex)
            {
                return BadRequest("Δεν ήταν δυνατό η αποθήκευση των στοιχείων");
            }
        }
    }
}
