﻿// <auto-generated />
using System;
using DashnDotApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DashnDotApp.Migrations
{
    [DbContext(typeof(SqlContext))]
    partial class SqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DashnDotApp.Model.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RGB");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Color");
                });

            modelBuilder.Entity("DashnDotApp.Model.Items", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ProductId");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("DashnDotApp.Model.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.Property<bool>("isMain");

                    b.Property<int>("productId");

                    b.HasKey("Id");

                    b.HasIndex("productId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("DashnDotApp.Model.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Active");

                    b.Property<string>("Category");

                    b.Property<string>("Code");

                    b.Property<string>("Description");

                    b.Property<string>("Design");

                    b.Property<string>("Discount");

                    b.Property<string>("Line");

                    b.Property<string>("Material");

                    b.Property<string>("Price");

                    b.Property<string>("Quantity");

                    b.Property<string>("Season");

                    b.Property<string>("Sleeve");

                    b.Property<string>("Title");

                    b.Property<string>("TotalCost");

                    b.Property<string>("seoUrl");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("DashnDotApp.Model.ProductSize", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProductId");

                    b.Property<int>("SizeId");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("SizeId");

                    b.ToTable("ProductSizes");
                });

            modelBuilder.Entity("DashnDotApp.Model.ProductSizeColor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ColorId");

                    b.Property<int>("Count");

                    b.Property<int>("ProductSizeId");

                    b.HasKey("Id");

                    b.HasIndex("ColorId");

                    b.HasIndex("ProductSizeId");

                    b.ToTable("ProductSizeColors");
                });

            modelBuilder.Entity("DashnDotApp.Model.ShoppingCarts", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("itemsId");

                    b.HasKey("Id");

                    b.HasIndex("itemsId");

                    b.ToTable("ShoppingCarts");
                });

            modelBuilder.Entity("DashnDotApp.Model.Size", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Region");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Size");
                });

            modelBuilder.Entity("DashnDotApp.Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("LastName");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DashnDotApp.Model.Items", b =>
                {
                    b.HasOne("DashnDotApp.Model.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("DashnDotApp.Model.Photo", b =>
                {
                    b.HasOne("DashnDotApp.Model.Product", "Product")
                        .WithMany("Photos")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.ProductSize", b =>
                {
                    b.HasOne("DashnDotApp.Model.Product")
                        .WithMany("ProductSizes")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DashnDotApp.Model.Size", "Size")
                        .WithMany()
                        .HasForeignKey("SizeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.ProductSizeColor", b =>
                {
                    b.HasOne("DashnDotApp.Model.Color", "Color")
                        .WithMany()
                        .HasForeignKey("ColorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DashnDotApp.Model.ProductSize", "ProductSizes")
                        .WithMany("ProductSizeColor")
                        .HasForeignKey("ProductSizeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.ShoppingCarts", b =>
                {
                    b.HasOne("DashnDotApp.Model.Items", "items")
                        .WithMany()
                        .HasForeignKey("itemsId");
                });
#pragma warning restore 612, 618
        }
    }
}
