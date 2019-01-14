using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class Discount
    {
        public int Id { get; set; }
        public string Coupon { get; set; }
        public int Percent { get; set; }
    }
}
