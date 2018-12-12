using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


        [Authorize]
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
        [Authorize]
        [Route("deleteMessage/{id}")]
        [HttpDelete]
        public IActionResult DeleteMessage(int Id)
        {
            try
            {
                var message = _ctx.Messages.Find(Id);
                var result =_ctx.Messages.Remove(message);
                _ctx.SaveChanges();
                return Ok(result.Entity);

            }
            catch (Exception ex)
            {
                return BadRequest("Δεν ήταν δυνατή η διαγραφή του μηνύματος");
            }
        }
        [Authorize]
        [Route("getMessagesForAdmin")]
        [HttpGet]
        public IActionResult GetMessagesForAdmin()
        {
            try
            {
                var messages = _ctx.Messages.ToList();
         
          
                return Ok(messages);

            }
            catch (Exception ex)
            {
                return BadRequest("Υπήρξε πρόβλημα");
            }
        }

        [Authorize]
        [Route("order/{id}")]
        [HttpGet]
        public IActionResult GetOrder(string id)
        {
            try
            {
                var order = _ctx.Orders.Include(i => i.OrderItems).Include(i => i.PaypalInformation).FirstOrDefault(x => x.Id == id);
                
                return Ok(order);

            }
            catch (Exception ex)
            {
                return BadRequest("Υπήρξε πρόβλημα");
            }
        }





    }
}
   
