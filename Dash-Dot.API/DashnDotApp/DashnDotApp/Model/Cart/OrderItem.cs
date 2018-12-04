using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model.Cart
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public virtual Order Order { get; set; }

        public string Title { get; set; }
        public string Category { get; set; }
        public string Line { get; set; }
        public string Code { get; set; }

        public int Quantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }



    }
}
