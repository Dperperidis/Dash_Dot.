using DashnDotApp.Data;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace DashnDotApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private SqlContext _ctx;
        public ShoppingCartController(SqlContext ctx)
        {
            _ctx = ctx;
        }


        [Route("insert")]
        [HttpPost]
        public IActionResult AddCart([FromBody]ShoppingCart cart)
        {
            try
            {
                cart.UserId = User.Claims.First(x => x.Type == "Id").Value; ;

                for (var i = 0; i < cart.Items.Count; i++)
                {
                    cart.Items[i] = null;
                }

                _ctx.ShoppingCarts.Add(cart);
                _ctx.SaveChanges();
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


    }
}
