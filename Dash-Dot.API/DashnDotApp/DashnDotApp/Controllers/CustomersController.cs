using AutoMapper;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase

    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private SqlContext _ctx;

        public int ProductForDetailedDto { get; private set; }

        public CustomersController(IProductRepository repo, IMapper mapper, SqlContext ctx)
        {
            _ctx = ctx;
            _repo = repo;
            _mapper = mapper;
        }

        [Route("getProductsByCategory/{category}")]
        [HttpGet]
        public IActionResult GetProductByCategory(string category)
        {
            try
            {

                var products = _ctx.Product.Include(p => p.Photos).ToList();
                var productsToReturn = products.FindAll(x => x.Active == "Ενεργοποιημένο").Where(y => y.Category == category);
                var productsFull = _mapper.Map<IEnumerable<ProductForListDto>>(productsToReturn);
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
        public IActionResult GetProductBySize(string line)
        {
            try
            {
                var products = _ctx.Product.Include(p => p.Photos).ToList();
                var productsToReturn = products.FindAll(x => x.Active == "Ενεργοποιημένο").Where(x => x.Line == line);
                var productsFull = _mapper.Map<IEnumerable<ProductForListDto>>(productsToReturn);
                return Ok(productsFull);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα");
            }

        }
    }
}
