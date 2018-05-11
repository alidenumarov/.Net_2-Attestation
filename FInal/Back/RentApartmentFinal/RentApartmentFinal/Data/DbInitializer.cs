using RentApartmentFinal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Data
{
    public class DbInitializer
    {
        public static void Initialize(RentContext context)
        {
            context.Database.EnsureCreated();
            if (context.Regions.Any()) { return; }

            var regions = new Region[]
            {
                new Region {Name="Alatau", Tax=24},
                new Region {Name="Medeu", Tax=33},
                new Region {Name="Turksyb", Tax=12},
                new Region {Name="Bostandyk", Tax=19},
            };
            foreach (Region r in regions)
            {
                context.Regions.Add(r);
            }
            context.SaveChanges();

            var apartments = new Apartment[]
            {
                new Apartment {Address="Akniyet 2/4/42", RegionID=1, Price=150000},
                new Apartment {Address="Akniyet 2/15/27", RegionID=1, Price=140000},
                new Apartment {Address="Aisulu 1/12/22", RegionID=1, Price=178000},
                new Apartment {Address="Aisulu 3/10/2", RegionID=1, Price=120000},
                new Apartment {Address="Aisulu 1/8/65", RegionID=1, Price=130000},

                new Apartment {Address="Titanik 5/13/88", RegionID=2, Price=85000},
                new Apartment {Address="Titanik 5/4/53", RegionID=2, Price=100000},
                new Apartment {Address="Zhas Kanat 1/3/45", RegionID=2, Price=95000},
                new Apartment {Address="Zhas Kanat 1/5/71", RegionID=2, Price=90000},
                new Apartment {Address="Tengiz 1/3/38", RegionID=2, Price=92000},

                new Apartment {Address="Zhibek 3/34/4", RegionID=3, Price=67000},
                new Apartment {Address="Zhibek 1/68/2", RegionID=3, Price=55000},
                new Apartment {Address="Besagash 5/7/66", RegionID=3, Price=88000},
                new Apartment {Address="Serpin 7/10/17", RegionID=3, Price=69000},
                new Apartment {Address="Tarbagatay 4/7/33", RegionID=3, Price=64500},

                new Apartment {Address="Aidyn 4/1/15", RegionID=4, Price=75000},
                new Apartment {Address="Aidyn 4/1/16", RegionID=4, Price=85000},
                new Apartment {Address="Ak Kent 7/3/45", RegionID=4, Price=80000},
                new Apartment {Address="Ak Kent 7/5/71", RegionID=4, Price=77000},
                new Apartment {Address="Ak Kent 7/3/22", RegionID=4, Price=85000},
            };
            foreach (Apartment a in apartments)
            {
                context.Apartments.Add(a);
            }
            context.SaveChanges();

            var customers = new Customer[]
            {
                new Customer {Username="user1", Password="user1"},
                new Customer {Username="user2", Password="user2"},
                new Customer {Username="user3", Password="user3"},
            };
            foreach (Customer c in customers)
            {
                context.Customers.Add(c);
            }
            context.SaveChanges();

            var rents = new Rent[]
            {
                new Rent {CustomerID=5, TotalPrice=550000},
            };
            foreach (Rent r in rents)
            {
                context.Rents.Add(r);
            }
            context.SaveChanges();

            var rentDetails = new RentDetail[]
            {
                new RentDetail {RentID=1, ApartmentID=1},
                new RentDetail {RentID=1, ApartmentID=2},
                new RentDetail {RentID=1, ApartmentID=3},
            };
            foreach(RentDetail rd in rentDetails)
            {
                context.RentDetails.Add(rd);
            }
            context.SaveChanges();
        }
    }
}
