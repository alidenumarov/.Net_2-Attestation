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
    [Route("api/Rents")]
    public class RentsController : Controller
    {
        private readonly RentContext _context;

        public RentsController(RentContext context)
        {
            _context = context;
        }

        // GET: api/Rents
        [HttpGet]
        public IEnumerable<Rent> GetRents()
        {
            return _context.Rents;
        }

        // GET: api/Rents/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rent = await _context.Rents.SingleOrDefaultAsync(m => m.ID == id);

            if (rent == null)
            {
                return NotFound();
            }

            return Ok(rent);
        }

        // PUT: api/Rents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRent([FromRoute] int id, [FromBody] Rent rent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rent.ID)
            {
                return BadRequest();
            }

            _context.Entry(rent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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

        // POST: api/Rents
        //[HttpPost]
        //public async Task<IActionResult> PostRent([FromBody] Rent rent)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Rents.Add(rent);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetRent", new { id = rent.ID }, rent);
        //}
        [HttpPost]
        public void PostPerson([FromBody] Rent rent)
        {
            _context.Rents.Add(rent);
            _context.SaveChanges();
        }

        // DELETE: api/Rents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rent = await _context.Rents.SingleOrDefaultAsync(m => m.ID == id);
            if (rent == null)
            {
                return NotFound();
            }

            _context.Rents.Remove(rent);
            await _context.SaveChangesAsync();

            return Ok(rent);
        }

        private bool RentExists(int id)
        {
            return _context.Rents.Any(e => e.ID == id);
        }
    }
}