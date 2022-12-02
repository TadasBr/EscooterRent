using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models
{
    public class RentPoint
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
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

    public class WorkTime
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int StartHours { get; set; }
        public int StartMinutes { get; set; }
        public int EndHours { get; set; }
        public int EndMinutes { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int? RentPointId { get; set; }
    }
}
