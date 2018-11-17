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

        public  Photo GetPhoto(int Id)
        {
            var photo =  _ctx.Photos.FirstOrDefault(p => p.Id == Id);
            return photo;
        }

        public  bool SaveAll()
        {
            return  _ctx.SaveChanges() > 0;
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


        public  Photo GetMainPhotoForProduct(int productId)
        {
            return  _ctx.Photos.Where(u => u.productId == productId).FirstOrDefault(p => p.isMain);
        }

        public PagedList<Product> GetProducts(ProductParams productParams)
        {
            var product = _ctx.Product.Include(p => p.Photos);
            return  PagedList<Product>.Create(product, productParams.PageNumber, productParams.PageSize);
        }

        public  Product GetProduct(string code)
        {
            var product =  _ctx.Product.Include(p => p.Photos).FirstOrDefault(u => u.Code == code);
            return product;
        }

        public  IEnumerable<Product> GetProducts(string category)
        {
            var products =  _ctx.Product.Include(p => p.Photos).OrderByDescending(u=>u.Created).ToList();
            var productsToReturn = products.Where(x => x.Category == category);
            return productsToReturn;
        }

        public Product GetProductByTitle(string seoUrl)
        {
            var temp = _ctx.Product.Include("ProductSizes")
                .Include("ProductSizes.ProductSizeColor")
                .Include("ProductSizes.Size").Include("ProductSizes.ProductSizeColor.Color")
                .Include(p => p.Photos)
                .FirstOrDefault(c => c.seoUrl == seoUrl);
            return temp;

        }

        public Color GetColor(int id)
        {
            var color = _ctx.Color.Find(id);
                return color;
        }

        public PagedList<Product> GetProductByLine(ProductParams productParams,string line)
        {

            var products = _ctx.Product.Include(p => p.Photos).Include("ProductSizes")
               .Include("ProductSizes.ProductSizeColor")
               .Include("ProductSizes.Size").
               Include("ProductSizes.ProductSizeColor.Color");
            var productsToReturn = products.Where(x => x.Active == "Ενεργοποιημένο").Where(x => x.Line == line);
            return PagedList<Product>.Create(productsToReturn, productParams.PageNumber, productParams.PageSize);

        }

        public PagedList<Product> GetProductByCategory(ProductParams productParams, string category)
        {
            var products = _ctx.Product.Include(p => p.Photos).Include("ProductSizes")
              .Include("ProductSizes.ProductSizeColor")
              .Include("ProductSizes.Size").
              Include("ProductSizes.ProductSizeColor.Color");
            var productsToReturn = products.Where(x => x.Active == "Ενεργοποιημένο").Where(y => y.Category == category).OrderBy(y=>y.Code);
            return PagedList<Product>.Create(productsToReturn, productParams.PageNumber, productParams.PageSize);
        }

        public PagedList<Product> GetProductByCategoryForAdmin(ProductParams productParams, string category, string sortBy)
        {
            var products = _ctx.Product.Include(p => p.Photos).Include("ProductSizes")
              .Include("ProductSizes.ProductSizeColor")
              .Include("ProductSizes.Size").
              Include("ProductSizes.ProductSizeColor.Color");
            var productsToReturn = products.Where(y => y.Category == category).OrderBy(y => y.Active);

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "created":
                        productsToReturn = productsToReturn.OrderByDescending(u => u.Created);
                        break;
                    case "totalCost":
                        productsToReturn = productsToReturn.OrderBy(u => u.Price);
                        break;
                    case "code":
                        productsToReturn = productsToReturn.OrderByDescending(u => u.Code);
                        break;
                    case "active":
                        productsToReturn = productsToReturn.OrderBy(u => u.Active);
                        break;
                    default:
                        productsToReturn = productsToReturn.OrderByDescending(u => u.Id);
                        break;
                }
            }
            return PagedList<Product>.Create(productsToReturn, productParams.PageNumber, productParams.PageSize);
        }
    }
}
