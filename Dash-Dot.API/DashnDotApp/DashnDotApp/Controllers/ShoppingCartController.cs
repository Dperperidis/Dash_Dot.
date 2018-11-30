using DashnDotApp.Data;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace DashnDotApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private SqlContext _ctx;
        private IAuthRepository _repo;

        public ShoppingCartController(SqlContext ctx, IAuthRepository repo)
        {
            _ctx = ctx;
            _repo = repo;
        }


        [Route("insert")]
        [HttpPost]
        public IActionResult AddCart([FromBody]ShoppingCart cart)
        {
            try
            {
                // Gets userId from global User claims
                var userId = User.GetUserId();

                cart.UserId = userId;
                //for (int i = 0; i < cart.Items.Count; i++)
                //{
                //    cart.Items[i] = null;
                //}

                //_ctx.ShoppingCarts.Add(cart);
                //_ctx.SaveChanges();
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("get/cart")]
        [HttpGet]
        public IActionResult GetCart()
        {
            try
            {
                // Gets userId from global User claims
                var userId = User.GetUserId();


                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("update/cart")]
        [HttpPut]
        public IActionResult UpdateCart([FromBody]ShoppingCart cart)
        {
            try
            {
                // Gets userId from global User claims
                var userId = User.GetUserId();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("clear/cart")]
        [HttpPost]
        public IActionResult ClearCart()
        {
            try
            {
                var userId = User.GetUserId();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


    }
}
