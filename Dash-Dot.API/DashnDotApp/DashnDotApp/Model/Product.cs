using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class Product
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
        public string Sleeve { get; set; }
        public string Discount { get; set; }
        public string Active { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
  
        
    }

    public class ProductSize
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public virtual Size Size { get; set; }
        public ICollection<ProductsSizeColor> Colors { get; set; }
    }

   public class ProductsSizeColor
    {
        public int Id { get; set; }
        public int ProductSizeId { get; set; }
        public int ColorId { get; set; }
        public int Count { get; set; }

    }

    public class Size
    {
        public int Id { get; set; }
        public string  Title { get; set; }
        public string Region { get; set; }

    }

    public class Color
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string RGB { get; set; }
    }
}
