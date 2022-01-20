using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Landmark.API.Dtos
{
    public class LandmarkDetailsDto
    {
        public long LandmarkID { get; set; }
        public string UserID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Remark { get; set; }
    }
}
