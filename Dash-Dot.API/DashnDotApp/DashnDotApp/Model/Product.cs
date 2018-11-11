using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;

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
        public string Design { get; set; }
        public string seoUrl { get; set; }
        public string Quantity { get; set; }
        public string Discount { get; set; }
        public string Active { get; set; }
        public string TotalCost { get; set; }
        public virtual IList<Photo> Photos { get; set; }
        public virtual IList<ProductSize> ProductSizes { get; set; }
        public Product()
        {
            ProductSizes = new List<ProductSize>();
            Photos = new List<Photo>();
        }

    }

    public class ProductSize
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
        public IList<ProductSizeColor> ProductSizeColor { get; set; }
        public ProductSize()
        {
            ProductSizeColor = new List<ProductSizeColor>();
        }
    }

    public class ProductSizeColor
    {

        public int Id { get; set; }
        public int ProductSizeId { get; set; }
        public ProductSize ProductSizes { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int Count { get; set; }

    }

    public class Size
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Region { get; set; }

    }

    public class Color
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string RGB { get; set; }
    }
}
