using EscooterRentAPI.Auth.Model;
using EscooterRentAPI.Data;
using EscooterRentAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace EscooterRentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentPointController : ControllerBase
    {
        private readonly ElectricScooterDbContext _context;
        private readonly IAuthorizationService _authorizationService;

        public RentPointController(ElectricScooterDbContext context, IAuthorizationService service)
        {
            _context = context;
            _authorizationService = service;
        }

        [HttpGet]
        public async Task<IEnumerable<RentPoint>> GetRentPoints() =>
            await _context.RentPoints.ToListAsync();

        [HttpGet, Route("RentPointsByCount/{count}")]
        public async Task<IEnumerable<RentPoint>> GetRentPoints(int count) =>
            await _context.RentPoints.Take(count).ToListAsync();

        [HttpGet, Route("RentPointsById/{rentId}")]
        [ProducesResponseType(typeof(RentPoint), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRentPointById(int rentPointId)
        {
            var rentPoint = await _context.RentPoints.FindAsync(rentPointId);
            return rentPoint == null ? NotFound() : Ok(rentPoint);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateRentPoint(RentPoint rentPoint)
        {
            rentPoint.UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            await _context.RentPoints.AddAsync(rentPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateRentPoint), new { id = rentPoint.Id }, rentPoint);
        }

        [HttpPut("{rentPointId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = RentRoles.RentUser)]
        public async Task<IActionResult> UpdateRentPoint(int rentPointId, RentPoint rentPoint)
        {
            if (rentPointId != rentPoint.Id) return BadRequest();

            var authorisationResult = await _authorizationService.AuthorizeAsync(User, rentPoint, PolicyNames.ResourceOwner);
            if (!authorisationResult.Succeeded)
            {
                return Forbid();
            }

            _context.Entry(rentPoint).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{rentPointId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteRentPoint(int rentPointId)
        {
            var rentPointToDelete = await _context.RentPoints.FindAsync(rentPointId);
            if (rentPointToDelete == null) return NotFound();

            _context.RentPoints.Remove(rentPointToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
