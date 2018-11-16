using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 1000;

        public int PageNumber { get; set; } = 1;
        private int pageSize = 8;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

    }
}
