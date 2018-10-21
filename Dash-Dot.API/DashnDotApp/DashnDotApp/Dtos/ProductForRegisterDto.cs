using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class ProductForRegisterDto
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Season { get; set; }
        [Required]
        public string Material { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Quantity { get; set; }
        [Required]
        public string Sleeve { get; set; }
        [Required]
        public string Line { get; set; }
        [Required]
        public string Discount { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string Active { get; set; }




    }
}
