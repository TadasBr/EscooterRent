using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models
{
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
