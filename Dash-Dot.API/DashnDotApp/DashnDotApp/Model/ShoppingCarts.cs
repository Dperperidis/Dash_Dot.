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
        public Items items { get; set; }

    }
}
