using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
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
    [Route("api/products/{productId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IProductRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                 _cloudinaryConfig.Value.CloudName,
                 _cloudinaryConfig.Value.ApiKey,
                 _cloudinaryConfig.Value.ApiSecret
                 );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForProduct(string productId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            // για να δουμε αν ειναι authorize o χρηστης
            //if (productId != int.Parse(Product.FindFirst(ClaimTypes.NameIdentifier).Value))
            //    return Unauthorized();

            var productFromRepo = await _repo.GetProduct(productId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(300).Height(300).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!productFromRepo.Photos.Any(u => u.isMain))
                photo.isMain = true;

            productFromRepo.Photos.Add(photo);



            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");

        }

    }
}
