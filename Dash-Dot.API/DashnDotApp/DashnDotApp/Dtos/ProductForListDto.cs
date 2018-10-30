using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class ProductForListDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
        public string Title { get; set; }
        public string Line { get; set; }
        public string Code { get; set; }
        public string Season { get; set; }
        public string Material { get; set; }
        public string Description { get; set; }
        public string Design { get; set; }
        public string Quantity { get; set; }
        public string Sleeve { get; set; }
        public string Discount { get; set; }
        public string Active { get; set; }
        public string PhotoUrl { get; set; }
    }
}
