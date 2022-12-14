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

        [HttpGet, Route("SpecificationsByCount/{specificationId}")]
        [ProducesResponseType(typeof(RentPoint), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSpecificationsById(int specificationId)
        {
            var specification = await _context.Specifications.FindAsync(specificationId);
            return specification == null ? NotFound() : Ok(specification);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateSpecification(ElectricScooterSpecification specification)
        {
            await _context.Specifications.AddAsync(specification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateSpecification), new { id = specification.Id }, specification);
        }

        [HttpPut("{specificationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = RentRoles.RentUser)]
        public async Task<IActionResult> UpdateSpecification(int specificationId, ElectricScooterSpecification specification)
        {
            if (specificationId != specification.Id) return BadRequest();

            _context.Entry(specification).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{specificationId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteRentPoint(int specificationId)
        {
            var specificationToDelete = await _context.Specifications.FindAsync(specificationId);
            if (specificationToDelete == null) return NotFound();

            _context.Specifications.Remove(specificationToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
