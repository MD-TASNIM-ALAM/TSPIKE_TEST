using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Landmark.API.Data.Entities
{
	[Table("User")]
	public class User
    {
		[Key]
		public int UserID { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(150)")]
		public string Email { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(100)")]
		public string Password { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(200)")]
		public string DisplayName { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(100)")]
		public string FirstName { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(100)")]
		public string LastName { get; set; }
		[Required]
		[Column(TypeName = "nvarchar(20)")]
		public string Phone { get; set; }
		public string Position { get; set; }
		public DateTime? LastLogin { get; set; }
		public DateTime? LastUpdated { get; set; }
		public bool? IsActive { get; set; }
	}
}
