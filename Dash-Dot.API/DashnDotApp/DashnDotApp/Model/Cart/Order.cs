﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Model.Cart
{
    public class Order
    {
        public string Id { get; set; }
        public int OrderNo { get; set; }
        public DateTime OrderDate { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Area { get; set; }

        public double Total { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
        public List<OrderItem> OrderItems { get; set; }

        public string PaypalInformationId { get; set; }
        public virtual PaypalInformation PaypalInformation { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public bool IsPickUp { get; set; }
        public string Store { get; set; }
        public string Comments { get; set; }


    }

    public enum OrderStatus
    {
        Pending, // Σε εξέλιξη
        Completed, // Ολοκληρωμένη
        Shipping, // Σε αποστολή
        Canceled,   // Ακυρωμένη
        All // Όλα
    }

    public enum PaymentMethod
    {
        Cod, // Cash on Delivery (αντικαταβολή)
        Paypal
    }
}
