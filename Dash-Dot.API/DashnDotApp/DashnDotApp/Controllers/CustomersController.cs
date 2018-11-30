using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase

    {
        private readonly IProductRepository _repo;
        private readonly IAuthRepository _authrepo;
        private readonly IMapper _mapper;
        private SqlContext _ctx;

        public int ProductForDetailedDto { get; private set; }

        public CustomersController(IProductRepository repo, IMapper mapper, SqlContext ctx, IAuthRepository authrepo)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
            _authrepo = authrepo;
        }

        [Route("getProductsByCategory/{category}")]
        [HttpGet]
        public IActionResult GetProductByCategory([FromQuery]ProductParams productParams,string category)
        {
            try
            {

                var products = _repo.GetProductByCategory(productParams, category);


                var productsFull = _mapper.Map<IEnumerable<ProductForListDto>>(products);
                Response.AddPagination(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

                return Ok(productsFull);

            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα");
            }
        }

        [Route("getProductBySeoUrl/{seoUrl}")]
        [HttpGet]
        public IActionResult GetProduct(string seoUrl)
        {
            try
            {
                var product = _repo.GetProductByTitle(seoUrl);

                var productToReturn = _mapper.Map<ProductForDetailedDto>(product);

                return Ok(productToReturn);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα");
            }
        }

        [Route("getSizeColor/{sizeId}/{prodId}")]
        [HttpGet]
        public ActionResult GetSizes(int sizeId, int prodId)
        {
            try
            {

                var result = _ctx.ProductSizes.Include("ProductSizeColor").Include("ProductSizeColor.Color").Where(x => x.ProductId == prodId);

                var product = result.FirstOrDefault(x => x.SizeId == sizeId);

                return Ok(product);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("getProductsByLine/{line}")]
        [HttpGet]
        public IActionResult GetProductBySize([FromQuery]ProductParams productParams,string line)
        {
            try
            {

                var products = _repo.GetProductByLine(productParams, line);

               
                var productsFull = _mapper.Map<IEnumerable<ProductForListDto>>(products);
                Response.AddPagination(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

                return Ok(productsFull);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα");
            }

        }

        [Route("addMessage")]
        [HttpPost]
        public IActionResult AddMessage(MessageForCreateDto messageForCreateDto)
        {
            try
            {

                var messageToCreate = _mapper.Map<CustMessage>(messageForCreateDto);
                var result = _ctx.Messages.Add(messageToCreate);
                
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Δεν έγινε η αποθήκευση του συστήματος");
            }
        }

        [Route("addShopCart")]
        [HttpPost]
        public IActionResult AddCart([FromBody]ShoppingCarts shoppingCart,int userId)
        {
            try
            {

                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                    return Unauthorized();

                var userFromRepo = _authrepo.GetUser(userId);
                for (var i =0; i < shoppingCart.Items.Count; i++)
                {
                    shoppingCart.Items[i].Product = null;
                   
                }

                var result = _ctx.ShoppingCarts.Add(shoppingCart);

                _ctx.SaveChanges();
                return Ok(result);
            } 
            catch (Exception ex)
            {
                return BadRequest("Δεν έγινε δημιουργία");
            }
        }
    }
}
