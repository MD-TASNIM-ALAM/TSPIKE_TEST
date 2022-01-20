using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Landmark.API.Dtos;
using Landmark.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Landmark.API.Data
{
    public class AuthRepository: IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Login repo
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>user</returns>
        public async Task<User> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userForLoginDto.Email && x.Password == userForLoginDto.Password);
            if (user == null)
                return null;
            return user;
        }
        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Email == username))
                return true;
            return false;
        }
    }
}
