using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lab7_SPA.Data;
using Lab7_SPA.Models;

namespace Lab7_SPA.Controllers
{
    [Produces("application/json")]
    [Route("api/People")]
    public class PeopleController : Controller
    {
        private readonly SocialNetworkContext _context;

        public PeopleController(SocialNetworkContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public IEnumerable<Person> GetPersons()
        {
            return _context.Persons;
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public Person GetPerson([FromRoute] int id)
        {
            var person = _context.Persons.First(m => m.ID == id);
            return person;
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson([FromRoute] int id, [FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person.ID)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
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

        // POST: api/People
        [HttpPost]
        public void PostPerson([FromBody] Person person)
        {
            _context.Persons.Add(person);
            _context.SaveChanges();
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public void DeletePerson([FromRoute] int id)
        {
            Person person = _context.Persons.First(m => m.ID == id);
            _context.Persons.Remove(person);
            _context.SaveChanges();
        }

        private bool PersonExists(int id)
        {
            return _context.Persons.Any(e => e.ID == id);
        }
    }
}