using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentApartmentFinal.Data;
using RentApartmentFinal.Models;

namespace RentApartmentFinal.Controllers
{
    [Produces("application/json")]
    [Route("api/RentDetails")]
    public class RentDetailsController : Controller
    {
        private readonly RentContext _context;

        public RentDetailsController(RentContext context)
        {
            _context = context;
        }

        // GET: api/RentDetails
        [HttpGet]
        public IEnumerable<RentDetail> GetRentDetails()
        {
            return _context.RentDetails;
        }

        // GET: api/RentDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rentDetail = await _context.RentDetails.SingleOrDefaultAsync(m => m.ID == id);

            if (rentDetail == null)
            {
                return NotFound();
            }

            return Ok(rentDetail);
        }

        // PUT: api/RentDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentDetail([FromRoute] int id, [FromBody] RentDetail rentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rentDetail.ID)
            {
                return BadRequest();
            }

            _context.Entry(rentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RentDetails
        [HttpPost]
        public async Task<IActionResult> PostRentDetail([FromBody] RentDetail rentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RentDetails.Add(rentDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentDetail", new { id = rentDetail.ID }, rentDetail);
        }

        // DELETE: api/RentDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rentDetail = await _context.RentDetails.SingleOrDefaultAsync(m => m.ID == id);
            if (rentDetail == null)
            {
                return NotFound();
            }

            _context.RentDetails.Remove(rentDetail);
            await _context.SaveChangesAsync();

            return Ok(rentDetail);
        }

        private bool RentDetailExists(int id)
        {
            return _context.RentDetails.Any(e => e.ID == id);
        }
    }
}