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

        [HttpGet("{rentId}")]
        [ProducesResponseType(typeof(RentPoint), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRentPointById(int rentPointId)
        {
            var rentPoint = await _context.RentPoints.FindAsync(rentPointId);
            return rentPoint == null ? NotFound() : Ok(rentPoint);
        }

        [HttpPost, Route("CreateRentPoint")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateRentPoint(RentPoint rentPoint)
        {
            await _context.RentPoints.AddAsync(rentPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRentPointById), new { id = rentPoint.Id });
        }

        [HttpPut("{rentPointId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateRentPoint(int rentPointId, RentPoint rentPoint)
        {
            if (rentPointId != rentPoint.Id) return BadRequest();

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
            if(rentPointToDelete == null) return NotFound();

            _context.RentPoints.Remove(rentPointToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet, Route("Scooters")]
        public async Task<IEnumerable<ElectricScooter>> GetScooters() =>
            await _context.ElectricScooters.ToListAsync();


        [HttpGet("{scooterId}")]
        [ProducesResponseType(typeof(ElectricScooter), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetScooterById(int scooterId)
        {
            var scooter = await _context.ElectricScooters.FindAsync(scooterId);
            return scooter == null ? NotFound() : Ok(scooter);
        }

        [HttpPost, Route("CreateScooter")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateScooter(ElectricScooter electricScooter)
        {
            await _context.ElectricScooters.AddAsync(electricScooter);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRentPointById), new { id = electricScooter.Id });
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
            var rentPointToDelete = await _context.RentPoints.FindAsync(scooterId);
            if (rentPointToDelete == null) return NotFound();

            _context.RentPoints.Remove(rentPointToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
