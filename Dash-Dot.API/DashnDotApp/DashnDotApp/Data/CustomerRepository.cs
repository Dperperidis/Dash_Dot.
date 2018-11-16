using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashnDotApp.Helpers;
using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DashnDotApp.Data
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly SqlContext _ctx;


        public CustomerRepository(SqlContext context)
        {
            _ctx = context;
        }


        public void Add<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public PagedList<CustMessage> GetMessages(UserParams userParams)
        {


            var messages = _ctx.Messages;
            return PagedList<CustMessage>.Create(messages, userParams.PageNumber, userParams.PageSize);

        }
    }
}
