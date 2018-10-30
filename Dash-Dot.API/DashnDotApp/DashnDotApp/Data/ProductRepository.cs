using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashnDotApp.Data;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DashnDotApp.Dtos
{
    public class ProductRepository : IProductRepository
    {

        private readonly SqlContext _ctx;


        public ProductRepository(SqlContext context)
        {
            _ctx = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _ctx.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _ctx.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int Id)
        {
            var photo = await _ctx.Photos.FirstOrDefaultAsync(p => p.Id == Id);
            return photo;
        }

        public async Task<bool> SaveAll()
        {
            return await _ctx.SaveChangesAsync() > 0;
        }


        public Product GetProduct(int id)
        {
            var temp = _ctx.Product.Include("ProductSizes")
                .Include("ProductSizes.ProductSizeColor")
                .Include("ProductSizes.Size").Include("ProductSizes.ProductSizeColor.Color")
                .Include(p=> p.Photos)
                .FirstOrDefault(c => c.Id == id);
            return temp;

        }


        public async Task<Photo> GetMainPhotoForProduct(int productId)
        {
            return await _ctx.Photos.Where(u => u.productId == productId).FirstOrDefaultAsync(p => p.isMain);
        }

        public async Task<IEnumerable<Product>> GetProducts(ProductParams productParams)
        {
            var products = await _ctx.Product.Include(p => p.Photos).ToListAsync();
            return products;
        }

        public async Task<Product> GetProduct(string code)
        {
            var product = await _ctx.Product.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Code == code);
            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts(string category)
        {
            var products = await _ctx.Product.Include(p => p.Photos).ToListAsync();
            var productsToReturn = products.Where(x => x.Category == category);
            return productsToReturn;
        }
    }
}
