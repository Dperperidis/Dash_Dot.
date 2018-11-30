using DashnDotApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Data
{
    public interface IAuthRepository
    {
        User Register(User user, string password);
        bool UserExists(string email);
        User Login(string email, string password);
        User GetUser(string Id);
    }
}
