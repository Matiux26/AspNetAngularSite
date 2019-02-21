using Microsoft.EntityFrameworkCore;

namespace Project1.Models
{
    public class Project1Context : DbContext
    {
        public Project1Context (DbContextOptions<Project1Context> options)
            : base(options)
        {
        }

        public DbSet<UserModel.Users> User { get; set; }
        public DbSet<ProductModel.Products> Product { get; set; }
    }
}
