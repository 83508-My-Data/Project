using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class UserDto
    {
        public int UserId { get; set; }

        
        public string FirstName { get; set; }

      
        public string LastName { get; set; }

        
        public string Email { get; set; }

        

        
        public string MobileNo { get; set; }

        
       
        public string Address { get; set; }
    }
}
