using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Models
{
    public class Project1Context : DbContext
    {
        public Project1Context (DbContextOptions<Project1Context> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Predictions> Predictions { get; set; }
        public DbSet<User_info> User_info { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Delivery_addresses> Delivery_addresses { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Order_items> Order_items { get; set; }
    }
}
