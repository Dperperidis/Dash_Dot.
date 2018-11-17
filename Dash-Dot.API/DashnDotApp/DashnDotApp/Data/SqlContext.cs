using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static DashnDotApp.Model.ShoppingCart;

namespace DashnDotApp.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
       public DbSet<Item> Items { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Color> Color { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<ProductSizeColor> ProductSizeColors { get; set; }
        public DbSet<CustMessage> Messages { get; set; }


     
    }
}
