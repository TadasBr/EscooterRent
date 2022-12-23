using Microsoft.AspNetCore.Identity;

namespace EscooterRentAPI.Auth.Model
{
    public class RentRestUser : IdentityUser
    {
        [PersonalData]
        public string? AdditionalInfo { get; set; }        
        public bool isAdmin()
        {
            return this.UserName == "admin";
        }
    }
}
