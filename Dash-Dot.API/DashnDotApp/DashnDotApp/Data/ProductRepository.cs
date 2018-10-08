using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashnDotApp.Data;
using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DashnDotApp.Dtos
{
    public class ProductRepository : IProductRepository
    {

        private readonly SqlContext _context;


        public ProductRepository(SqlContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int Id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id== Id);
            return photo;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<Products> GetProducts()
        {
            var products = _context.Product.FirstOrDefaultAsync();

            return await products;

        }

        public async Task<Products> GetProduct(string id)
        {
            var product = await _context.Product.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return product;
        }

    }
}
