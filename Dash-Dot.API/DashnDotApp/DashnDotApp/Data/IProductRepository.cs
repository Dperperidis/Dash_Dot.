using DashnDotApp.Helpers;
using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Dtos
{
    public interface IProductRepository
    {

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        PagedList<Product> GetProducts(ProductParams productParams);
        Product GetProduct(int id);
        Product GetProductByTitle(string title);
        Task<Product> GetProduct(string code);
        PagedList<Product> GetProductByLine(ProductParams productParams,string line);
        PagedList<Product> GetProductByCategory(ProductParams productParams, string category);
        PagedList<Product> GetProductByCategoryForAdmin(ProductParams productParams, string category, string sortBy);
        Task<Photo> GetPhoto(int id);
        Color GetColor(int id);
        Task<Photo> GetMainPhotoForProduct(int productId);
        //Task<IEnumerable<Product>> GetProducts(string category);

    }
}
