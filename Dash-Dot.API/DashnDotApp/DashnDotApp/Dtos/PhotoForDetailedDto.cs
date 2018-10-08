using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class PhotoForDetailedDto
    {
        public int id { get; set; }
        public string Url { get; set; }
        public bool isMain { get; set; }
    }
}
