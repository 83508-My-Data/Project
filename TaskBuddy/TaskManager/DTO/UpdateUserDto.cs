namespace TaskManager.DTO
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
        public DateOnly DOB { get; set; }
    }
}
