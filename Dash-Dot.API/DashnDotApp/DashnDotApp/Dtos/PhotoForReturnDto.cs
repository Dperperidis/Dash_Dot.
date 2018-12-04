using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool isMain { get; set; }
        public string PublicId { get; set; }
<<<<<<< HEAD
        public string Color { get; set; }

=======
        public int ColorPointer { get; set; }
>>>>>>> 8d294fb70f0eb5cbba54cbc7eca33ad40ab3d4b4
    }
}
