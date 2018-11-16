using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AdminCustController : ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private SqlContext _ctx;
        private readonly IMapper _mapper;

        public AdminCustController(SqlContext ctx, IMapper mapper, ICustomerRepository repo)
        {
            _ctx = ctx;
            _mapper = mapper;
            _repo = repo;
        }



        [Route("getMessages")]
        [HttpGet]
        public IActionResult GetMessages([FromQuery]UserParams userParams)
        {
            try
            {


                var messages = _repo.GetMessages(userParams);
                var result = _mapper.Map<IEnumerable<MessageForDetailedDto>>(messages);

                Response.AddPagination(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest("Υπήρξε πρόβλημα");
            }
        }




    }
}
   
