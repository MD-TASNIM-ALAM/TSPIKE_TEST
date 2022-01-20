using Newtonsoft.Json;
using Landmark.API.Data;
using Landmark.API.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Landmark.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    user.Email = user.Email.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }
    }
}
