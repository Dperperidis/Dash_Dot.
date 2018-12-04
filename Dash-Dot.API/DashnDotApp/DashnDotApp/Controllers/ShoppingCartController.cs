using DashnDotApp.Data;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using DashnDotApp.Model.Cart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace DashnDotApp.Controllers
{
    [Authorize]
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
                for (var i = 0; i < cartItems.Count; i++)
                {
                    var exists = cart.FirstOrDefault(x => x.ProductId == cartItems[i].ProductId && x.Color == cartItems[i].Color && x.Size == cartItems[i].Size);
                    if (exists == null)
                    {
                        cartItems[i].UserId = userId;
                        cartItems[i].DateCreated = DateTime.UtcNow;
                        cartItems[i].Product = null;
                        _ctx.Cart.Add(cartItems[i]);
                    
                    }
                    else
                    {
                        exists.Quantity = exists.Quantity + cartItems[i].Quantity;
                        _ctx.Update(exists);
                    }
                    _ctx.SaveChanges();

                }
                var finalCart = _ctx.Cart.Include(i => i.Product).Where(x => x.UserId == userId).ToList();
                return Ok(finalCart);
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

        [Route("place/order/")]
        [HttpPost]
        public IActionResult PlaceOrder([FromBody] Order order)
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
                order.UserId = userId;
                order.OrderStatus = OrderStatus.Pending;
                order.OrderDate = DateTime.UtcNow;
                for (var i = 0; i < cart.Count; i++)
                {
                    var orderItem = new OrderItem();
                    orderItem.Category = cart[i].Product.Category;
                    orderItem.Title = cart[i].Product.Title;
                    orderItem.Code = cart[i].Product.Code;
                    orderItem.Line = cart[i].Product.Line;
                    orderItem.Quantity = cart[i].Quantity;
                    orderItem.Color = cart[i].Color;
                    orderItem.Size = cart[i].Size;
                    orderItem.Price = cart[i].Product.TotalCost;
                    orderItem.PhotoUrl = cart[i].PhotoUrl;

                    order.OrderItems.Add(orderItem);
                }

                var result = _ctx.Orders.Add(order);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
    }
}
