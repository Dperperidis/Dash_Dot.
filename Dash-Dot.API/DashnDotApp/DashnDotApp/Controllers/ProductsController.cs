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
        public async Task<IActionResult> GetProducts([FromQuery]ProductParams productParams)
        {

            var products = await _repo.GetProducts(productParams);

            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(products);

            return Ok(productsToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
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


                //var temp = _ctx.Product.Include(i => i.ProductSizes.Select(s => s.ProductSizeColor)).FirstOrDefault(x => x.Id == result.Entity.Id);
                //var productSizes = _ctx.ProductSizes.Include(i => i.ProductSizeColor).Where(x => x.ProductId == result.Entity.Id).ToList();
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

            //var productByCode = await _repo.GetProduct(code);
            //var productToReturn = _mapper.Map<ProductForDetailedDto>(productByCode);
            //return Ok(productToReturn);
            var temp = _ctx.Product.Include("ProductSizes").Include("ProductSizes.ProductSizeColor").Include("ProductSizes.Size").Include("ProductSizes.ProductSizeColor.Color").FirstOrDefault(c => c.Code == code);
            return Ok(temp);

        }

        [Route("getProductsByCategory/{category}")]
        [HttpGet]
        public async Task<IActionResult> GetProductByCategory(string category)
        {

            var productsByCategory = await _repo.GetProducts(category);
            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(productsByCategory);

            return Ok(productsToReturn);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productFromRepo =  _repo.GetProduct(id);

            var result = _ctx.Product.Remove(productFromRepo);


            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Deleting product {id} failed");
        }



    }



}
