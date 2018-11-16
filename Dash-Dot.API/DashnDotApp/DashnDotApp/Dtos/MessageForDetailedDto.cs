using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public class MessageForDetailedDto
    {

        public int Id { get; set; }
        public string Message { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public string Code { get; set; }
    }
}
