using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Landmark.API.Dtos;
using Landmark.API.Data.Entities;

namespace Landmark.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(UserForLoginDto userForLoginDto);
        Task<bool> UserExists(string username);
    }
}
