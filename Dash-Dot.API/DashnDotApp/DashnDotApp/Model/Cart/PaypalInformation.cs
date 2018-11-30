using System;
using System.Collections.Generic;

namespace DashnDotApp.Model.Cart
{
    public class PaypalInformation
    {
        public string CartId { get; set; }
        public DateTime CreateTime { get; set; }
        public string PaypalId { get; set; }
        public string Intent { get; set; }
        public string Total { get; set; }
        public string Currency { get; set; }
        public string PayerEmail { get; set; }
        public string PayerName { get; set; }
        public string PayerLastname { get; set; }
        public string PayerMiddleName { get; set; }
        public string PayerId { get; set; }


    }
}

