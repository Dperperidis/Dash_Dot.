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
        Task <IEnumerable<Products>> GetProducts(ProductParams productParams);
        Task<Products> GetProduct(int id);
        Task<Products> GetProduct(string code);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForProduct(int productId);
    }
}
