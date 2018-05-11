using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Models
{
    public class RentDetail
    {
        public int ID { get; set; }

        public int RentID { get; set; }
        public int ApartmentID { get; set; }
    }
}
