﻿using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static DashnDotApp.Model.ShoppingCarts;

namespace DashnDotApp.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ShoppingCarts> ShoppingCarts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Color> Color { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<ProductSizeColor> ProductSizeColors { get; set; }
        public DbSet<CustMessage> Messages { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Sizes>()
        //        .HasKey(x => x.SizeId);

        //    modelBuilder.Entity<Colors>()
        //        .HasKey(x => x.ColorId);

        //    modelBuilder.Entity<Products>()
        //        .HasKey(x => new { x.SizesId, x.ColorsId });
        //    modelBuilder.Entity<Products>()
        //        .HasOne(x => x.Sizes)
        //        .WithMany(m => m.Colors)
        //        .HasForeignKey(x => x.SizesId);
        //    modelBuilder.Entity<Products>()
        //        .HasOne(x => x.Colors)
        //        .WithMany(e => e.Sizes)
        //        .HasForeignKey(x => x.ColorsId);
        //}
    }
}
