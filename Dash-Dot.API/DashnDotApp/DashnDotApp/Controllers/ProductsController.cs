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
        public async Task<IActionResult> GetProducts()
        {

            var products = await _repo.GetProducts();

            var productsToReturn = _mapper.Map <IEnumerable< ProductForListDto>>(products);

            return Ok(productsToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(string id)
        {
            var product = await _repo.GetProduct(id);

            var productToReturn = _mapper.Map<ProductForDetailedDto>(product);

            return Ok(productToReturn);
        }

        [Route("addProduct")]
        [HttpPost]
        public IActionResult Post([FromBody]Products product)
        {
            var result = _ctx.Product.Add(product);
            _ctx.SaveChanges();
            return Ok(result.Entity);
        }




    }



}
