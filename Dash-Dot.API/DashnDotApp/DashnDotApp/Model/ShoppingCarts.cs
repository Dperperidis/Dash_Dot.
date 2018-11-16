using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class ShoppingCarts
    {

        public int Id { get; set; }
        public DateTime Created { get; set; }
        public virtual IList<Item> Items { get; set; }
        public ShoppingCarts()
        {
            Items = new List<Item>();
        }


        public class Item
        {
            public int Id { get; set; }
            public int ProductId { get; set; }
            public Product Product { get; set; }
        }
    }
}

