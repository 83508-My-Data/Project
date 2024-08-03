using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TaskManager.Models;

namespace TaskManager.DTO
{
    public class RegistrationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }
        public int DeptId { get; set; }
        public DateOnly DOB { get; set; }
    }
}
