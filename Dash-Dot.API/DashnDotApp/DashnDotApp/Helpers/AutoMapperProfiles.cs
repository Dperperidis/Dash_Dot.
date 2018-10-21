﻿using AutoMapper;
using DashnDotApp.Dtos;
using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<Product, ProductForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                });

            CreateMap<Product, ProductForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
            });
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<Product, ProductForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
            });
            CreateMap<UserForRegisterDto, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<ProductForRegisterDto, Product>();
            CreateMap<Product, ProductForListDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.isMain).Url);
            });
        }
    }
}
