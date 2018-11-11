using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class ProductForUpdateDto
    {
        public string Category { get; set; }
        public string Price { get; set; }
        public string Title { get; set; }
        public string Size { get; set; }
        public string Line { get; set; }
        public string Code { get; set; }
        public string Season { get; set; }
        public string Material { get; set; }
        public string Description { get; set; }
        public string Quantity { get; set; }
        public string Active { get; set; }
        public string Sleeve { get; set; }
        public string Discount { get; set; }
        public string Color { get; set; }
        public string TotalCost { get; set; }

    }
}
