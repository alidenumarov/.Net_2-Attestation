using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Models
{
    public class Rent
    {
        public int ID { get; set; }

        public int CustomerID { get; set; }

        public int TotalPrice { get; set; }

        public List<RentDetail> RentDetails { get; set; }
    }
}
