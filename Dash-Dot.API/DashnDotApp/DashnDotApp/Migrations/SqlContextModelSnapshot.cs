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

            modelBuilder.Entity("DashnDotApp.Model.Cart.CartItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("PhotoUrl");

                    b.Property<int>("ProductId");

                    b.Property<int>("Quantity");

                    b.Property<string>("Size");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("Cart");
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.Order", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("Area")
                        .IsRequired();

                    b.Property<string>("City")
                        .IsRequired();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Mobile")
                        .IsRequired();

                    b.Property<DateTime>("OrderDate");

                    b.Property<int>("OrderStatus");

                    b.Property<int>("PaymentMethod");

                    b.Property<string>("PaypalInformationId");

                    b.Property<string>("PostalCode")
                        .IsRequired();

                    b.Property<double>("Total");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category");

                    b.Property<string>("Code");

                    b.Property<string>("Color");

                    b.Property<string>("Line");

                    b.Property<string>("OrderId")
                        .IsRequired();

                    b.Property<string>("PhotoUrl");

                    b.Property<double>("Price");

                    b.Property<int>("Quantity");

                    b.Property<string>("Size");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.PaypalInformation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Amount")
                        .IsRequired();

                    b.Property<string>("CartId");

                    b.Property<DateTime>("CreateTime");

                    b.Property<string>("Currency");

                    b.Property<string>("Intent");

                    b.Property<string>("OrderId")
                        .IsRequired();

                    b.Property<string>("PayerEmail");

                    b.Property<string>("PayerId");

                    b.Property<string>("PayerLastname")
                        .IsRequired();

                    b.Property<string>("PayerMiddleName");

                    b.Property<string>("PayerName")
                        .IsRequired();

                    b.Property<string>("PaypalId");

                    b.Property<string>("Total")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("OrderId")
                        .IsUnique();

                    b.ToTable("PaypalInformation");
                });

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

            modelBuilder.Entity("DashnDotApp.Model.CustMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<string>("Message");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("DashnDotApp.Model.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ColorPointer");

                    b.Property<bool>("IsMain");

                    b.Property<int>("ProductId");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

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

                    b.Property<DateTime>("Created");

                    b.Property<string>("Description");

                    b.Property<string>("Design");

                    b.Property<double>("Discount");

                    b.Property<string>("Line");

                    b.Property<string>("Material");

                    b.Property<double>("Price");

                    b.Property<string>("Quantity");

                    b.Property<string>("Season");

                    b.Property<string>("Sleeve");

                    b.Property<bool>("Suggested");

                    b.Property<string>("Title");

                    b.Property<double>("TotalCost");

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
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Area");

                    b.Property<string>("City");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("LastName");

                    b.Property<string>("Mobile");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PostalCode");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.CartItem", b =>
                {
                    b.HasOne("DashnDotApp.Model.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DashnDotApp.Model.User", "User")
                        .WithMany("Cart")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.Order", b =>
                {
                    b.HasOne("DashnDotApp.Model.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.OrderItem", b =>
                {
                    b.HasOne("DashnDotApp.Model.Cart.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.Cart.PaypalInformation", b =>
                {
                    b.HasOne("DashnDotApp.Model.Cart.Order", "Order")
                        .WithOne("PaypalInformation")
                        .HasForeignKey("DashnDotApp.Model.Cart.PaypalInformation", "OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DashnDotApp.Model.Photo", b =>
                {
                    b.HasOne("DashnDotApp.Model.Product", "Product")
                        .WithMany("Photos")
                        .HasForeignKey("ProductId")
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
#pragma warning restore 612, 618
        }
    }
}
