using DashnDotApp.Model.Cart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Helpers
{
    public static class ValidateOrder
    {
        public static bool IsInValid(this Order order)
        {
            return string.IsNullOrEmpty(order.FirstName) ||
                string.IsNullOrEmpty(order.LastName) ||
                string.IsNullOrEmpty(order.Email) ||
                string.IsNullOrEmpty(order.Address) ||
                string.IsNullOrEmpty(order.Mobile) ||
                string.IsNullOrEmpty(order.PostalCode) ||
                string.IsNullOrEmpty(order.City) ||
                string.IsNullOrEmpty(order.Area) ||
                string.IsNullOrEmpty(order.UserId) ||
                string.IsNullOrEmpty(order.PostalCode);
        }


        //για τιμή χωρίς έκπτωση
        //public static double GetTotal(this List<CartItem> items)
        //{
        //    double total = 0;
        //    items.ForEach(item =>
        //    {
        //        total = total + (item.Product.TotalCost * item.Quantity);
        //    });
        //    return total;
        //}

        //για τιμή με έκπτωση
        public static double GetTotal(this List<CartItem> items)
        {
            double total = 0;
            items.ForEach(item =>
            {
                total = total + (item.Product.TotalCost * item.Quantity);
            });
            return total - (total/100)*20;
        }
    }
}

