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

        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public PaymentMethods PaymentMethod { get; set; }


        public ShoppingCart()
        {
            Items = new List<Item>();
        }

        public class Item
        {
            public int Id { get; set; }
            public int ProductId { get; set; }
            public int Quantity { get; set; }
            public string Color { get; set; }
            public string Size { get; set; }
            public virtual Product Product { get; set; }
        }

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

        public enum PaymentMethods
        {
            Cash,
            Paypal
        }

    }
}

