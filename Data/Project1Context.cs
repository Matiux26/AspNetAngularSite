using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project1.UserModel;

namespace Project1.Models
{
    public class Project1Context : DbContext
    {
        public Project1Context (DbContextOptions<Project1Context> options)
            : base(options)
        {
        }

        public DbSet<Project1.UserModel.Users> User { get; set; }
    }
}
