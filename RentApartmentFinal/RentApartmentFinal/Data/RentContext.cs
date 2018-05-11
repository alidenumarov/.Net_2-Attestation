using Microsoft.EntityFrameworkCore;
using RentApartmentFinal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Data
{
    public class RentContext : DbContext
    {
        public RentContext(DbContextOptions<RentContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<RentDetail> RentDetails { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Region> Regions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Rent>().ToTable("Rent");
            modelBuilder.Entity<RentDetail>().ToTable("RentDetail");
            modelBuilder.Entity<Apartment>().ToTable("Apartment");
            modelBuilder.Entity<Region>().ToTable("Region");

        }

        public DbSet<RentApartmentFinal.Models.Report> Report { get; set; }
    }
}
