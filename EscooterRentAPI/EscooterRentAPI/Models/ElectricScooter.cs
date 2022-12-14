using EscooterRentAPI.Auth.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models
{
    public class RentPoint : IUserOwnedResource
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        [Required]
        public string UserId { get; set; }
        public RentRestUser User { get; set;}
    }

    public class ElectricScooter
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int MaxDistance { get; set; }
        public double PricePerDay { get; set; }
        public int MaxSpeed { get; set; }
        public int? RentPointId { get; set; }
    }

    public class ElectricScooterSpecification
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int HeightCM { get; set; }
        public int LengthCM { get; set; }
        public int WheelSizeCM { get; set; }
        public bool HasSpeedometer { get; set; }
        public int ElectricScooterId { get; set; }
    }
}
