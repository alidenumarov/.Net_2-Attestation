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
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private readonly SocialNetworkContext _context;

        public ReportsController(SocialNetworkContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        public IEnumerable<Report> GetReport()
        {
            var persons = _context.Persons;

            var grouped = persons
                .GroupBy(x => x.Category)
                .Select(s => new Report {
                    Category = s.Key,
                    AvgMark = s.Average(x => x.Mark),
                    MaxMark = s.Max(x => x.Mark),
                    MinMark = s.Min(x => x.Mark),
                    CntMark = s.Select(x => x.Mark).Count(),
                    SumMark = s.Sum(x => x.Mark),
                });

            return grouped.ToList();
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var report = await _context.Report.SingleOrDefaultAsync(m => m.ID == id);

            if (report == null)
            {
                return NotFound();
            }

            return Ok(report);
        }

        // PUT: api/Reports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport([FromRoute] int id, [FromBody] Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != report.ID)
            {
                return BadRequest();
            }

            _context.Entry(report).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // POST: api/Reports
        [HttpPost]
        public async Task<IActionResult> PostReport([FromBody] Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Report.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReport", new { id = report.ID }, report);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var report = await _context.Report.SingleOrDefaultAsync(m => m.ID == id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Report.Remove(report);
            await _context.SaveChangesAsync();

            return Ok(report);
        }

        private bool ReportExists(int id)
        {
            return _context.Report.Any(e => e.ID == id);
        }
    }
}