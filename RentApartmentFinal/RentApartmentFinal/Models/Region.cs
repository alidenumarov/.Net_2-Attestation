using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Models
{
    public class Region
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Tax { get; set; }

        public List<Apartment> Apartment { get; set; }
    }
}
