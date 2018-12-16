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

                if (order.PaymentMethod == PaymentMethod.Paypal && order.PaypalInformation.State.ToLowerInvariant() != "approved")
                {
                    return BadRequest("H Πληρωμή δεν εγκρίθηκε");
                }

                var cart = _ctx.Cart.AsNoTracking().Include(i => i.Product).Where(x => x.UserId == userId).ToList();
                if (cart.Count == 0)
                {
                    return BadRequest("To καλάθι σας είναι άδειο");
                }
                order.UserId = userId;
                order.OrderStatus = OrderStatus.Pending;
                order.OrderDate = DateTime.UtcNow;
                var total = cart.GetTotal();
                total = order.IsPickUp ? total : total + 3;
                if (total != order.Total)
                {
                    return BadRequest("Σφάλμα κατα την επαλήθευση των προιόντων σας.");
                }
                if (order.IsInValid())
                {
                    return BadRequest("Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία");
                }
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
                // Removes All items from cart
                _ctx.RemoveRange(cart);
                var result = _ctx.Orders.Add(order);
                _ctx.SaveChanges();

                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("verify/order")]
        [HttpPost]
        public IActionResult VerifyOrder([FromBody] Order order)
        {
            try
            {
                var userId = User.GetUserId();
                var cart = _ctx.Cart.AsNoTracking().Include(i => i.Product).Where(x => x.UserId == userId).ToList();
                if (cart.Count == 0)
                {
                    return BadRequest("To καλάθι σας είναι άδειο");
                }
                order.UserId = userId;
                order.OrderStatus = OrderStatus.Pending;
                order.OrderDate = DateTime.Now;
                var total = cart.GetTotal();
                total = order.IsPickUp ? total : total + 3;
                if (total != order.Total)
                {
                    return BadRequest("Σφάλμα κατα την επαλήθευση των προιόντων σας.");
                }
                if (order.IsInValid())
                {
                    return BadRequest("Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία");
                }
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


        [Route("orders/{page}/{pageSize}/{order?}/{status?}/{search?}")]
        [HttpGet]
        public IActionResult GetOrdersForAdmin(int page, int pageSize, string order = "", string status = "", string search = "")
        {
            try
            {
                var query = from obj in _ctx.Orders select obj;

                switch (status)
                {
                    case "Pending":
                        query = query.Where(s => s.OrderStatus == OrderStatus.Pending);
                        break;
                    case "Completed":
                        query = query.Where(s => s.OrderStatus == OrderStatus.Completed);
                        break;
                    case "Shipping":
                        query = query.Where(s => s.OrderStatus == OrderStatus.Shipping);
                        break;
                    case "Canceled":
                        query = query.Where(s => s.OrderStatus == OrderStatus.Canceled);
                        break;
                    default:
                        break;
                }

                if (!string.IsNullOrWhiteSpace(search))
                {
                    search = search.ToLower();
                    query = query.Where(t => t.Mobile == search);
                }

                switch (order)
                {
                    case "lastname":
                        query = query.OrderBy(s => s.LastName);
                        break;
                    case "lastname_desc":
                        query = query.OrderByDescending(s => s.LastName);
                        break;
                    case "order_date":
                        query = query.OrderBy(s => s.OrderDate);
                        break;
                    case "order_date_desc":
                        query = query.OrderByDescending(s => s.OrderDate);
                        break;
                    default:
                        query = query.OrderByDescending(s => s.LastName);
                        break;
                }

                var rows = query.Count();
                var result = query.AsNoTracking()
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var pages = new PagedData<Order>();
                pages.Order = order;
                pages.Page = page;
                pages.Status = status;
                pages.Rows = result;
                pages.Search = search;
                pages.TotalRows = rows;
                pages.PageSize = pageSize;

                return Ok(pages);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Route("user/orders/{page}/{pageSize}")]
        [HttpGet]
        public IActionResult GetOrdersForUser(int page, int pageSize)
        {
            try
            {
                var userId = User.GetUserId();
                var query = from obj in _ctx.Orders.Include(i => i.OrderItems).Where(x => x.UserId == userId) select obj;

                query = query.OrderByDescending(s => s.OrderDate);

                var rows = query.Count();
                var result = query.AsNoTracking()
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var pages = new PagedData<Order>();
                pages.Page = page;
                pages.Rows = result;
                pages.TotalRows = rows;
                pages.PageSize = pageSize;

                return Ok(pages);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


        [Route("set/status/{id}/{status}")]
        [HttpPost]
        public IActionResult VerifyOrder(string id, OrderStatus status)
        {
            try
            {
                var order = _ctx.Orders.AsNoTracking().FirstOrDefault(x => x.Id == id);
                order.OrderStatus = status;
                _ctx.Orders.Update(order);
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
