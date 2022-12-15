using EscooterRentAPI.Data;
using EscooterRentAPI.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EscooterRentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScooterSpecificationController : ControllerBase
    {
        private readonly ElectricScooterDbContext _context;

        public ScooterSpecificationController(ElectricScooterDbContext context, IAuthorizationService service)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<ElectricScooterSpecification>> GetSpecifications() =>
            await _context.Specifications.ToListAsync();

        [HttpGet, Route("SpecificationsByCount/{count}")]
        public async Task<IEnumerable<ElectricScooterSpecification>> GetSpecificationsByCount(int count) =>
            await _context.Specifications.Take(count).ToListAsync();

        [HttpGet, Route("SpecificationsById/{specificationId}")]
        [ProducesResponseType(typeof(ElectricScooterSpecification), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSpecificationsById(int specificationId)
        {
            var specification = await _context.Specifications.FindAsync(specificationId);
            return specification == null ? NotFound() : Ok(specification);
        }

        [HttpPut("{specificationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSpecification(int specificationId, ElectricScooterSpecification specification)
        {
            if (specificationId != specification.Id) return BadRequest();

            _context.Entry(specification).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [ProducesResponseType(typeof(ElectricScooterSpecification), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet, Route("SpecificationsByScooterId/{scooterId}")]
        public async Task<IEnumerable<ElectricScooterSpecification>> GetScooterByRentId(int scooterId) =>
            await _context.Specifications.Where(specification => specification.ElectricScooterId == scooterId).ToListAsync();

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateSpecification(ElectricScooterSpecification specification)
        {
            await _context.Specifications.AddAsync(specification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateSpecification), new { id = specification.Id }, specification);
        }

        //[ProducesResponseType(typeof(ElectricScooterSpecification), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //[HttpGet, Route("ScootersByRentId/{rentId}/SpecificationsByScooterId/{scooterId}")]
        //public async Task<IEnumerable<ElectricScooterSpecification>> GetSpecificationsByScooterIdByRentId(int scooterId, int rentId) =>
        //    await _context.Specifications.Where(specification => specification.ElectricScooterId == scooterId).ToListAsync();


        [HttpDelete("{specificationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteSpecification(int specificationId)
        {
            var specificationToDelete = await _context.Specifications.FindAsync(specificationId);
            if (specificationToDelete == null) return NotFound();

            _context.Specifications.Remove(specificationToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
