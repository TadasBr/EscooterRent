using EscooterRentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EscooterRentAPI.Data
{
    public class ElectricScooterDbContext : DbContext
    {
        public ElectricScooterDbContext(DbContextOptions<ElectricScooterDbContext> options) : base(options)
        {
        }

        public DbSet<ElectricScooter> ElectricScooters { get; set; }
        public DbSet<RentPoint> RentPoints { get; set; }
        public DbSet<WorkTime> WorkTimes { get; set; }

    }
}
