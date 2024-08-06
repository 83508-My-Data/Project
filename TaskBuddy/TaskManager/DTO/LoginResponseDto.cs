using TaskManager.Models;

namespace TaskManager.DTO
{
    public class LoginResponseDto
    {
        public string token { get; set; }
        public Role role { get; set; }
    }
}
