﻿using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class ProductForDetailedDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public string Title { get; set; }
        public string Line { get; set; }
        public string Code { get; set; }
        public string Season { get; set; }
        public string Material { get; set; }
        public string Description { get; set; }
        public string Sleeve { get; set; }
        public string Design { get; set; }
        public bool Suggested { get; set; }
        public string seoUrl { get; set; }
        public string Quantity { get; set; }
        public double Discount { get; set; }
        public string Active { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime Created { get; set; }
        public double TotalCost
        {
            get
            {
                if (Discount == 0)
                {
                    return Price;
                }
                return Price - Discount;

            }

        }
        public IEnumerable<PhotoForDetailedDto> Photos { get; set; }
        public IEnumerable<ProductSize> ProductSizes { get; set; }
        public IEnumerable<ProductSizeColor> ProductSizeColors { get; set; }

        public ProductForDetailedDto()
        {
            //Photos = new List<PhotoForCreationDto>();
            //ProductSizes = new List<ProductSizeColor>();
            //ProductSizeColors = new List<ProductSize>();
        }




    }
}
