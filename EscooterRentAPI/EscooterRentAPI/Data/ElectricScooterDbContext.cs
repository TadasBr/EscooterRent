using EscooterRentAPI.Auth.Model;
using EscooterRentAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EscooterRentAPI.Data
{
    public class ElectricScooterDbContext : IdentityDbContext<RentRestUser>
    {
        public ElectricScooterDbContext(DbContextOptions<ElectricScooterDbContext> options) : base(options)
        {
        }

        public DbSet<ElectricScooter> ElectricScooters { get; set; }
        public DbSet<RentPoint> RentPoints { get; set; }
        public DbSet<ElectricScooterSpecification> Specifications { get; set; }

    }
}
