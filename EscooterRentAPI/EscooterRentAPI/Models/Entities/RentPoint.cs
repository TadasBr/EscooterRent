using EscooterRentAPI.Auth.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscooterRentAPI.Models.Entities
{
    public class RentPoint : IUserOwnedResource
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        [Required]
        public string UserId { get; set; }
        public RentRestUser User { get; set; }
    }
}
