using DashnDotApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashnDotApp.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly SqlContext _context;

        public AuthRepository(SqlContext context)
        {
            _context = context;
        }

        public User Login(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public bool UserExists(string email)
        {
            if (_context.Users.Any(x => x.Email == email))
                return true;

            return false;
        }

        public User Register(User user, string password)
        {
            byte[] passwordHash, PasswordSalt;
            CreatePasswordHash(password, out passwordHash, out PasswordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = PasswordSalt;
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
