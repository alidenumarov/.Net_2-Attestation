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
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private readonly RentContext _context;

        public ReportsController(RentContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        public IEnumerable<Report> GetReport()
        {
            var regions = _context.Regions;
            var apartments = _context.Apartments;
            var rentDetails = _context.RentDetails;
            var rents = _context.Rents;

            var apReg = regions
                .Join(apartments, x => x.ID, y => y.RegionID, (x, y) => new
                {
                    x,
                    y
                }).ToList();
            var rentDApReg = apReg
                .Join(rentDetails, a => a.y.ID, b => b.ApartmentID, (a, b) => new
                {
                    a,
                    b
                }).ToList();

            var gr = rentDApReg
                .Join(rents, k => k.b.RentID, l => l.ID, (k, l) => new
                {
                    k,
                    l
                }).ToList();

            var countOfAll = rentDetails.Count();

            var grouped = gr
                .GroupBy(x => x.k.a.x.Name)
                .Select(s => new Report
                {
                    Region = s.Key,
                    TotalAmountOfAllOrders = s.Sum(x => x.k.a.y.Price),
                    PercentageFromAllOrders = s.Select(sel => sel.k.b.ID).Count() / countOfAll * 100,
                });

            return grouped.ToList();
        }


        private bool ReportExists(int id)
        {
            return _context.Report.Any(e => e.ID == id);
        }
    }
}