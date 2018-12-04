using DashnDotApp.Data;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using DashnDotApp.Dtos;
using DashnDotApp.Helpers;

namespace DashnDotApp.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class SizesColorsController : ControllerBase
    {
        private SqlContext _ctx;
        private readonly IProductRepository _repo;

        public SizesColorsController(SqlContext ctx, IProductRepository repo)
        {
            _ctx = ctx;
            _repo = repo;
        }
        [Authorize]
        [Route("addColor")]
        [HttpPost]
        public IActionResult AddColor([FromBody]Color color)
        {
            try
            {
                if (_ctx.Color.Any(x => x.Title == color.Title))
                {
                    return BadRequest("Το χρώμα ήδη υπάρχει!");
                }

                var result = _ctx.Color.Add(color);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not add color");
            }
            

        }

        [Authorize]
        [Route("updateColor")]
        [HttpPost]
        public IActionResult UpdateColor([FromBody]Color color)
        {
            try
            {

                var result = _ctx.Color.Update(color);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not add color");
            }


        }

        [Authorize]
        [Route("deleteColor/{id}")]
        [HttpDelete]
        public ActionResult DeleteColor(int id)
        {
            try
            {

                var color = _repo.GetColor(id);

                var result = _ctx.Color.Remove(color);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not delete color");
            }


        }


        [Route("getColors")]
        [HttpGet]
        public IActionResult GetColors()
        {
            try
            {

                var colors = _ctx.Color.ToList().OrderBy(x=>x.Title);
                
                return Ok(colors);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }



        [Authorize]
        [Route("getColorsForAdmin")]
        [HttpGet]
        public IActionResult GetColorsForAdmin([FromQuery]ColorParams colorParams)
        {
            try
            {
                var colors = _repo.GetColors(colorParams);
                Response.AddPagination(colors.CurrentPage, colors.PageSize, colors.TotalCount, colors.TotalPages);
                return Ok(colors);

            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }


        }

        [Authorize]
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
        [Authorize]
        [Route("deleteProductColor/{id}")]
        [HttpDelete]
        public ActionResult DeleteProductColor(int id)
        {
            try
            {

                var color = _ctx.ProductSizeColors.FirstOrDefault(x => x.Id == id);

                var result = _ctx.ProductSizeColors.Remove(color);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not delete color");
            }
        }

      

    }

  
}
