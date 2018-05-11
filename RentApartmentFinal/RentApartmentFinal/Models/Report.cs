using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RentApartmentFinal.Models
{
    public class Report
    {
        public int ID { get; set; }
        public string Region { get; set; }
        public int TotalAmountOfAllOrders { get; set; }
        public int PercentageFromAllOrders { get; set; }
    }
}
