namespace EscooterRentAPI.Auth.Model
{
    public class RentRoles
    {
        public const string Admin = nameof(Admin);
        public const string RentUser = nameof(RentUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, RentUser };   
    }
}
