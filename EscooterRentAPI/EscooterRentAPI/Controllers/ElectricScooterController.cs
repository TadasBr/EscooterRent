using EscooterRentAPI.Data;
using EscooterRentAPI.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EscooterRentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectricScooterController : ControllerBase
    {
        private readonly ElectricScooterDbContext _context;
        private readonly IAuthorizationService _authorizationService;

        public ElectricScooterController(ElectricScooterDbContext context, IAuthorizationService service)
        {
            _context = context;
            _authorizationService = service;
        }

        [HttpGet, Route("Scooters")]
        public async Task<IEnumerable<ElectricScooter>> GetScooters() =>
            await _context.ElectricScooters.ToListAsync();

        [HttpGet("{count}")]
        public async Task<IEnumerable<ElectricScooter>> GetScootersByCount(int count) =>
            await _context.ElectricScooters.Take(count).ToListAsync();

        [ProducesResponseType(typeof(ElectricScooter), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet, Route("ScootersByRentId/{rentId}")]
        public async Task<IEnumerable<ElectricScooter>> GetScooterByRentId(int rentId) =>
            await _context.ElectricScooters.Where(scooter => scooter.RentPointId == rentId).ToListAsync();

        [HttpGet, Route("ScootersByScooterId/{scooterId}")]
        [ProducesResponseType(typeof(ElectricScooter), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetScooterById(int scooterId)
        {
            var scooter = await _context.ElectricScooters.FindAsync(scooterId);
            return scooter == null ? NotFound() : Ok(scooter);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateScooter(ElectricScooter electricScooter)
        {
            await _context.ElectricScooters.AddAsync(electricScooter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateScooter), new { id = electricScooter.Id }, electricScooter);
        }

        [HttpPut("{scooterId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateScooter(int scooterId, ElectricScooter scooter)
        {
            if (scooterId != scooter.Id) return BadRequest();

            _context.Entry(scooter).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{scooterId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteScooter(int scooterId)
        {
            var electricScooterToDelete = await _context.ElectricScooters.FindAsync(scooterId);
            if (electricScooterToDelete == null) return NotFound();

            _context.ElectricScooters.Remove(electricScooterToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
