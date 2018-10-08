using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Products> Product { get; set; }
        public DbSet<ShoppingCarts> ShoppingCarts { get; set; }
        public DbSet<Items> Items { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Colors> Colors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Colors>()
     .HasOne(a => a.Product).WithOne(b => b.Color)
     .HasForeignKey<Products>(e => e.ColorOfColorId);

        }
    }
}
