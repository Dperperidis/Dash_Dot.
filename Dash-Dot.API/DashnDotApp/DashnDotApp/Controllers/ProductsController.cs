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
using System.Security.Claims;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private SqlContext _ctx;

        public int ProductForDetailedDto { get; private set; }

        public ProductsController(IProductRepository repo, IMapper mapper, SqlContext ctx)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery]ProductParams productParams)
        {

            var products = _repo.GetProducts(productParams);

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(products);

            Response.AddPagination(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

            return Ok(productsToReturn);

        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _repo.GetProduct(id);

            var productToReturn = _mapper.Map<ProductForDetailedDto>(product);

            return Ok(productToReturn);
        }

        [Route("addProduct")]
        [HttpPost]
        public IActionResult AddProduct([FromBody]Product product)
        {
            try
            {
              
                if (_ctx.Product.Any(x => x.Code == product.Code))
                {
                    return BadRequest("Το προιον ήδη υπάρχει");
                }
                for (var i = 0; i < product.ProductSizes.Count; i++)
                {
                    product.ProductSizes[i].Size = null;
                    for (var c = 0; c < product.ProductSizes[i].ProductSizeColor.Count; c++)
                    {
                        product.ProductSizes[i].ProductSizeColor[c].Color = null;
                        product.ProductSizes[i].ProductSizeColor[c].ProductSizes = null;
                    }
                }

                var result = _ctx.Product.Add(product);

                _ctx.SaveChanges();

                var temp = _ctx.Product.Include("ProductSizes").Include("ProductSizes.ProductSizeColor").Include("ProductSizes.Size").Include("ProductSizes.ProductSizeColor.Color").FirstOrDefault(c => c.Id == result.Entity.Id);
                return Ok(temp);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [Route("getProductByCode/{code}")]
        [HttpGet]
        public ActionResult GetProductByCode(string code)
        {

            var temp = _ctx.Product.Include("ProductSizes")
                .Include("ProductSizes.ProductSizeColor")
                .Include("ProductSizes.Size").
                Include(p => p.Photos).
                Include("ProductSizes.ProductSizeColor.Color").FirstOrDefault(c => c.Code == code);

            var result = _mapper.Map<ProductForDetailedDto>(temp);

            return Ok(result);

        }



        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var productFromRepo = _repo.GetProduct(id);

            var result = _ctx.Product.Remove(productFromRepo);


            if ( _repo.SaveAll())
                return NoContent();

            throw new Exception($"Deleting product {id} failed");
        }

        [Route("updateProduct")]
        [HttpPost]
        public IActionResult UpdateProduct([FromBody]Product product)
        {
            try
            {
                if(product.Discount.ToString() == null)
                {
                    return BadRequest("Βάλε μια τιμή στην έκπτωση");
                }

                var savedProduct = _ctx.Product.Update(product);
                _ctx.SaveChanges();
                return Ok(savedProduct.Entity);

            }
            catch (Exception ex)
            {
                return BadRequest("Δεν έγινε ανανέωση του προϊόντος διότι δεν έχει γίνει αλλαγή");
            }
        }

        [Route("deleteSize/{id}")]
        [HttpDelete]
        public IActionResult DeleteSize(int id)
        {
            try
            {
                var product = _ctx.ProductSizes.FirstOrDefault(x => x.Id == id);
                var result = _ctx.ProductSizes.Remove(product);
                _ctx.SaveChanges();
                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest("Δεν έγινε η διαγραφή προϊόντος");
            }
        }





        [Route("getProductsByCategory/{category}/{sortBy}")]
        [HttpGet]
        public IActionResult GetProductByCategoryForAdmin([FromQuery]ProductParams productParams, string category, string sortBy)
        {
            try
            {
                var products = _repo.GetProductByCategoryForAdmin(productParams, category, sortBy);


                var productsFull = _mapper.Map<IEnumerable<ProductForListDto>>(products);
                Response.AddPagination(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

                return Ok(productsFull);


            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα");
            }
        }




    }
}
