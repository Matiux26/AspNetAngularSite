using Microsoft.EntityFrameworkCore;

namespace Project1.Models
{
    public class Project1Context : DbContext
    {
        public Project1Context (DbContextOptions<Project1Context> options)
            : base(options)
        {
        }

        public DbSet<UserModel.Users> Users { get; set; }
        public DbSet<ProductModel.Products> Products { get; set; }
    }
}
