using DashnDotApp.Data;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DashnDotApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SizesColorsController : ControllerBase
    {
        private SqlContext _ctx;

        public SizesColorsController(SqlContext ctx)
        {
            _ctx = ctx;
        }

        [Route("addColor")]
        [HttpPost]
        public IActionResult AddColor([FromBody]Color color)
        {
            try
            {
                var result = _ctx.Color.Add(color);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not add color");
            }
            

        }

        [Route("getColors")]
        [HttpGet]
        public IActionResult GetColors()
        {
            try
            {
                var result = _ctx.Color.ToList();
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }


        [Route("addSize")]
        [HttpPost]
        public IActionResult AddSize([FromBody]Size size)
        {
            try
            {
                var result = _ctx.Size.Add(size);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not add size");
            }


        }

        [Route("getSizes")]
        [HttpGet]
        public IActionResult GetSizes()
        {
            try
            {
                var result = _ctx.Size.ToList();
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }

        }

        [Route("getSizeColor/{sizeId}")]
        [HttpGet]
        public ActionResult GetSizes(int sizeId)
        {
            try
            {
                var result = _ctx.ProductSizes.Include("ProductSizeColor").Include("ProductSizeColor.Color").FirstOrDefault(x => x.SizeId == sizeId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }

        }

    }

  
}
