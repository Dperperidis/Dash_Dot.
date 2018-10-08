using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string email);
        Task<User> Login(string email, string password);
    }
}
