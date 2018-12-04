using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DashnDotApp.Data;
using DashnDotApp.Dtos;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DashnDotApp.Controllers
{
    [AllowAnonymous]
    [Route("api/products/{productId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private SqlContext _ctx;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IProductRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig, SqlContext ctx)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _ctx = ctx;

            Account acc = new Account(
                 _cloudinaryConfig.Value.CloudName,
                 _cloudinaryConfig.Value.ApiKey,
                 _cloudinaryConfig.Value.ApiSecret
                 );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public IActionResult GetPhoto(int id)
        {
            var photoFromRepo = _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public IActionResult AddPhotoForProduct(int productId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {

            //if (productId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();

            var productFromRepo = _repo.GetProduct(productId);

            var file = photoForCreationDto.File;


            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(740).Height(1100).Crop("fit")

                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;


            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!productFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            productFromRepo.Photos.Add(photo);



            if (_repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");

        }

        [HttpPost("{id}/setMain")]
        public IActionResult SetMainPhoto(int productId, int id)
        {


            var product = _repo.GetProduct(productId);


            if (!product.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("Είναι ήδη η βασική φωτογραφία");

            var currentMainPhoto = _repo.GetMainPhotoForProduct(productId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (_repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Δεν ήταν δυνατό να γίνει η βασική φωτογραφία");

        }


        [HttpDelete("{id}")]

        public IActionResult DeletePhoto(int productId, int id)
        {
            var product = _repo.GetProduct(productId);

            if (!product.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("Δεν μπορεις να σβήσεις την βασική σου φωτογραφία");

            if (photoFromRepo.PublicId != null)
            {

                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);


                _repo.Delete(photoFromRepo);

            }

            if (photoFromRepo.PublicId == null)
            {
                _repo.Delete(photoFromRepo);
            }


            if (_repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Υπήρξε Σφάλμα");

        }

    }
}
