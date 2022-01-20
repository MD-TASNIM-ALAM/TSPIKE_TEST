using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Landmark.API.Data.Entities
{
	[Table("Landmark")]
	public class Landmark
	{
		[Key]
		public long LandmarkID { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Remark { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
