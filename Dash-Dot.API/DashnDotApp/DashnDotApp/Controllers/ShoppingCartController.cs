using DashnDotApp.Data;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using DashnDotApp.Model.Cart;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        [Route("sync/carts")]
        [HttpPost]
        public IActionResult SycnOfflinCartWithDb([FromBody] List<CartItem> cartItems)
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }
                var cart = _ctx.Cart.Where(x => x.UserId == userId).ToList();
                //TODO  check new cartItems and cart from db in order to add or update items


                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("get/cart")]
        [HttpGet]
        public IActionResult GetUserCart()
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }
                var cart = _ctx.Cart.Include(i => i.Product).Where(x => x.UserId == userId).ToList();

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("remove/cart/item/{id}")]
        [HttpDelete]
        public IActionResult RemoveCartItem(int id)
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }
                var cartItem = _ctx.Cart.Find(id);
                if (cartItem == null)
                {
                    return BadRequest("Δεν βρέθηκε το προιόν για διαγραφή");
                }
                _ctx.Cart.Remove(cartItem);
                _ctx.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("add/item/cart")]
        [HttpPost]
        public IActionResult AddCartItem([FromBody] CartItem cartItem)
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }
                cartItem.UserId = userId;
                cartItem.DateCreated = DateTime.UtcNow;
                var temp = cartItem.Product;
                cartItem.Product = null;

                var result = _ctx.Cart.Add(cartItem);
                _ctx.SaveChanges();
                result.Entity.Product = temp;
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("update/item/cart")]
        [HttpPut]
        public IActionResult UpdateCartItem([FromBody] CartItem cartItem)
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }
                var temp = cartItem.Product;
                cartItem.UserId = userId;
                cartItem.Product = null;

                var result = _ctx.Cart.Update(cartItem);
                _ctx.SaveChanges();
                result.Entity.Product = temp;
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("clear/cart")]
        [HttpDelete]
        public IActionResult ClearUserCart()
        {
            try
            {
                var userId = User.GetUserId();
                if (string.IsNullOrEmpty(userId))
                {
                    // Αν δεν βρεθεί userid Δεν έχει σωστό Token Λογικά
                    return BadRequest("Δεν βρέθηκε ο χρήστης");
                }

                var cartItems = _ctx.Cart.Where(x => x.UserId == userId).ToList();
                _ctx.Cart.RemoveRange(cartItems);
                _ctx.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


    }
}
