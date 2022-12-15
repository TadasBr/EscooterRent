using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models.Entities
{
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
}
