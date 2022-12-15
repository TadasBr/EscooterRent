using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models.Entities
{
    public class ElectricScooterSpecification
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string specificationName { get; set; }
        public string description { get; set; }
        public int ElectricScooterId { get; set; }
    }
}
