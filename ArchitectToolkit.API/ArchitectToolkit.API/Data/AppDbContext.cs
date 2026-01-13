using ArchitectToolkit.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ArchitectToolkit.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
