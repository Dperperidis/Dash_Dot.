using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class Products
    {
        public string Id { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
        public string Title { get; set; }
        public string Size { get; set; }
        public string Line { get; set; }
        public string Code { get; set; }
        public string Season { get; set; }
        public string Material{ get; set; }
        public string Description { get; set; }
        public string Quantity { get; set; }
        public string Sleeve { get; set; }
        public string Discount { get; set; }
        public string ColorOfColorId { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public Colors Color { get; set; }
        
    }

    public class Colors
    {
        public string ColorsId { get; set; }
        public string Color { get; set; }

        
        public Products Product { get; set; }

    }

}
