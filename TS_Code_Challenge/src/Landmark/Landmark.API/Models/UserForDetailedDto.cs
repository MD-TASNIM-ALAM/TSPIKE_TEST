using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Landmark.API.Dtos
{
	public class UserForDetailedDto
	{
		public long UserID { get; set; }
		public string FirstName  {get; set; }
		public string LastName { get; set; }
		public string DisplayName { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Position { get; set; }
		public bool? IsAdministrator { get; set; }
		public DateTime? LastLogin { get; set; }
		public DateTime? LastUpdated { get; set; }
		public long? UpdatedBy { get; set; }
		public bool? IsActive { get; set; }
		public UserForDetailedDto()
		{
			LastLogin = DateTime.Now;
		}
	}
}
