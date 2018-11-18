using DashnDotApp.Data;
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
        public IActionResult AddCart([FromBody]ShoppingCart cart, string userId)
        {
            try
            {
                //if (userId != (User.FindFirst(ClaimTypes.NameIdentifier).Value))
                //    return Unauthorized();

                //var userFromRepo =  _repo.GetUser(userId);

                for (int i = 0; i < cart.Items.Count; i++)
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
