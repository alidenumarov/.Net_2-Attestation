using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab7_SPA.Models
{
    public class Report
    {
        public int ID { get; set; }
        public string Category { get; set; }
        public double AvgMark { get; set; }
        public int MaxMark { get; set; }
        public int MinMark { get; set; }
        public int CntMark { get; set; }
        public int SumMark { get; set; }
    }
}
