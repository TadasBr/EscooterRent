using System.ComponentModel.DataAnnotations;

namespace EscooterRentAPI.Auth.Model
{
    public record RegisterUserDto([Required] string UserName, 
        [EmailAddress][Required] string Email, [Required] string Password);

    public record LoginDto(string UserName, string Password);

    public record UserDto(string Id, string UserName, string Email);

    public record SuccessfulLogInDto(string accessToken, RentRestUser user, bool isAdmin);
}
