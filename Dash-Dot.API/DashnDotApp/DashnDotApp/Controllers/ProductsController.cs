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
            var product = await _repo.GetProduct(id);

            var productToReturn = _mapper.Map<ProductForDetailedDto>(product);

            return Ok(productToReturn);
        }

        [Route("addProduct")]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody]Product product)
        {
           if ( _ctx.Product.Any(x=>x.Code == product.Code))
            {
                return BadRequest("Το προιον ήδη υπάρχει");
            }


            var result = _ctx.Product.Add(product);
            _ctx.SaveChanges();
            return Ok(result.Entity);
        }



        [Route("getProductByCode/{code}")]
        [HttpGet]
        public  async Task<IActionResult> GetProductByCode(string code)
        {

            var productByCode = await _repo.GetProduct(code);
            var productToReturn = _mapper.Map<ProductForDetailedDto>(productByCode);
            return Ok(productToReturn);
            
        }

        [Route("getProductsByCategory/{category}")]
        [HttpGet]
        public async Task<IActionResult> GetProductByCategory(string category)
        {

            var productsByCategory = await _repo.GetProducts(category);
            var productsToReturn = _mapper.Map<IEnumerable<ProductForListDto>>(productsByCategory);

            return Ok(productsToReturn);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductForUpdateDto productForUpdateDto)
        {
            var productFromRepo = await _repo.GetProduct(id);

            _mapper.Map(productForUpdateDto, productFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating product {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productFromRepo = await _repo.GetProduct(id);

            var result = _ctx.Product.Remove(productFromRepo);
            
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Deleting product {id} failed");
        }




    }



}
