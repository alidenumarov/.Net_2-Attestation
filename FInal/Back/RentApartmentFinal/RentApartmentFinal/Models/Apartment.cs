using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Models
{
    public class Apartment
    {
        public int ID { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }

        public int RegionID { get; set; }
    }
}
