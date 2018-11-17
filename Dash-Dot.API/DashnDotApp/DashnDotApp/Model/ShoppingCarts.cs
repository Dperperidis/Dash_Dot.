using System;
using System.Collections.Generic;

namespace DashnDotApp.Model
{
    public class ShoppingCart
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Created { get; set; }
        public virtual IList<Item> Items { get; set; }

        public ShoppingCart()
        {
            Items = new List<Item>();
            Created = DateTime.UtcNow;
        }


        public class Item
        {
            public int Id { get; set; }
            public int ProductId { get; set; }
            public int Quantity { get; set; }
            public virtual Product Product { get; set; }
        }
    }
}

