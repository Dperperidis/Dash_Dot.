using DashnDotApp.Model;
using DashnDotApp.Model.Cart;
using Microsoft.EntityFrameworkCore;


namespace DashnDotApp.Data
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Color> Color { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<Material> MaterialTitle { get; set; }
        public DbSet<ProductSizeColor> ProductSizeColors { get; set; }
        public DbSet<CustMessage> Messages { get; set; }

        // Cart
        public DbSet<CartItem> Cart { get; set; }
        public DbSet<PaypalInformation> PaypalInformation { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var ppBuilder = modelBuilder.Entity<PaypalInformation>();
            ppBuilder.HasKey(k => k.Id);
            ppBuilder.Property(p => p.Total).IsRequired();
            ppBuilder.Property(p => p.PayerName).IsRequired();
            ppBuilder.Property(p => p.PayerLastname).IsRequired();
            ppBuilder.Property(p => p.Amount).IsRequired();

            var orderBuilder = modelBuilder.Entity<Order>();
            orderBuilder.HasKey(k => k.Id);
            orderBuilder.Property(p => p.Total).IsRequired();
            orderBuilder.Property(p => p.FirstName).IsRequired();
            orderBuilder.Property(p => p.LastName).IsRequired();
            orderBuilder.Property(p => p.Email).IsRequired();
            orderBuilder.Property(p => p.Address).IsRequired();
            orderBuilder.Property(p => p.Mobile).IsRequired();
            orderBuilder.Property(p => p.PostalCode).IsRequired();
            orderBuilder.Property(p => p.City).IsRequired();
            orderBuilder.Property(p => p.Area).IsRequired();
            orderBuilder.Property(p => p.OrderDate).IsRequired();

            modelBuilder.HasSequence<int>("MySequence", schema: "orders").StartsAt(1000).IncrementsBy(1);
            orderBuilder.Property(p => p.OrderNo).HasDefaultValueSql("NEXT VALUE FOR orders.MySequence");
            orderBuilder.HasMany(x => x.OrderItems)
                     .WithOne(x => x.Order)
                     .HasForeignKey(k => k.OrderId)
                     .IsRequired();
            orderBuilder.HasOne(x => x.PaypalInformation)
                        .WithOne(x => x.Order)
                        .HasForeignKey<PaypalInformation>(x => x.OrderId)
                        .IsRequired();

            var cartBuilder = modelBuilder.Entity<CartItem>();
            cartBuilder.HasKey(k => k.Id);
            cartBuilder.Property(p => p.DateCreated).IsRequired();
            cartBuilder.Property(p => p.Quantity).IsRequired();
            cartBuilder.HasOne(x => x.User)
                       .WithMany(x => x.Cart)
                       .HasForeignKey(x => x.UserId)
                       .IsRequired();

            var orderItemBuilder = modelBuilder.Entity<OrderItem>();
            orderItemBuilder.HasKey(k => k.Id);
            orderItemBuilder.Property(p => p.Quantity).IsRequired();
            orderItemBuilder.Property(p => p.Price).IsRequired();


        }
    }
}
