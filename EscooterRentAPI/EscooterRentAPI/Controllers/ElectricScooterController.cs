using EscooterRentAPI.Data;
using EscooterRentAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace EscooterRentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectricScooterController : ControllerBase
    {
        private readonly ElectricScooterDbContext _context;

        public ElectricScooterController(ElectricScooterDbContext context) => _context = context;

        [HttpGet, Route("RentPoints")]
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

        [HttpPost, Route("RentPoint")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateRentPoint(RentPoint rentPoint)
        {
            await _context.RentPoints.AddAsync(rentPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateRentPoint), new { id = rentPoint.Id }, rentPoint);
        }

        [HttpPut, Route("RentPoints/{rentPointId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateRentPoint(int rentPointId, RentPoint rentPoint)
        {
            if (rentPointId != rentPoint.Id) return BadRequest();

            _context.Entry(rentPoint).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete, Route("RentPoints/{rentPointId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]  
        public async Task<IActionResult> DeleteRentPoint(int rentPointId)
        {
            var rentPointToDelete = await _context.RentPoints.FindAsync(rentPointId);
            if(rentPointToDelete == null) return NotFound();

            _context.RentPoints.Remove(rentPointToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet, Route("Scooters")]
        public async Task<IEnumerable<ElectricScooter>> GetScooters() =>
            await _context.ElectricScooters.ToListAsync();

        [HttpGet, Route("Scoooters/{count}")]
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

        [HttpPost, Route("Scooter")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateScooter(ElectricScooter electricScooter)
        {
            await _context.ElectricScooters.AddAsync(electricScooter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateScooter), new { id = electricScooter.Id }, electricScooter);
        }

        [HttpPut("Scooters/{scooterId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateScooter(int scooterId, ElectricScooter scooter)
        {
            if (scooterId != scooter.Id) return BadRequest();

            _context.Entry(scooter).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete, Route("Scooters/{scooterId}")]
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
