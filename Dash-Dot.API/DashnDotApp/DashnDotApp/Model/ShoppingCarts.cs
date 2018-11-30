using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class ShoppingCarts
    {

        public string Id { get; set; }
        public DateTime Created { get; set; }
        public virtual IList<Item> Items { get; set; }
        public ShoppingCarts()
        {
            Items = new List<Item>();
            Created = DateTime.Now;
        }
 
    }

    public class Item
    {
        public string id { get; set; }
        public Product Product { get; set; }
        public int Quantity {get;set;}
    }
}

