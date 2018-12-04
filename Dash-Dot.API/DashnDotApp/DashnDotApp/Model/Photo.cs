using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public string Color { get; set; }
        public Product Product { get; set; }
<<<<<<< HEAD
        public int ProductId { get; set; }
=======
        public int productId { get; set; }
        public int ColorPointer { get; set; }
>>>>>>> 8d294fb70f0eb5cbba54cbc7eca33ad40ab3d4b4


    }
}
