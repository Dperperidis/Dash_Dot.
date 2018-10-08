using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class ProductForListDto
    {
        public int prodId { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public string Season { get; set; }
        public string Sleeve { get; set; }
        public string Line { get; set; }
        public string Discount { get; set; }
        public string PhotoUrl { get; set; }

    }
}
