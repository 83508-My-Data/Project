using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManager.DTO;
using TaskManager.ErrorLggers;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskBuddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [EnableCors("policy")]
    public class UsersController : ControllerBase
    {
        private TaskBuddyContext _Context = null;
        private IConfiguration _config;

        public UsersController(TaskBuddyContext context, IConfiguration config)
        {
            _Context = context;
            _config = config;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _Context.Users.ToList();
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _Context.Users.Find(id);
        }

        [HttpPost("/login")]
        public IActionResult Login([FromBody] Login loginUser)
        {
            //UserDto u =null;
            //foreach (var user in _Context.Users) 
            //{ 
            //    if(user.Email.Equals(loginUser.Email) && user.Password.Equals(loginUser.Password))
            //    {
            //        return "successfully loggedIn";

            //    }
            //}
            //return "invalid login credential";
            //FirstOrDefault =  when there is no match found it returns null
            var user = _Context.Users.Where(u => u.Email.Equals(loginUser.Email) && u.Password.Equals(loginUser.Password)).FirstOrDefault();
            if (user != null)
            {


                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                return Ok(new { name = "user1", token });
            }
            else
            {
                return Ok(new { error = "Invalid Username or Password" });
            }
        }

        [HttpPost("/register")]
        public IActionResult RegisterUser([FromBody] RegistrationDto registrationDto) 
        { 
            User user = new User();
            user.FirstName = registrationDto.FirstName;
            user.LastName = registrationDto.LastName;
            user.Email = registrationDto.Email;
            user.Password = registrationDto.Password;
            user.MobileNo = registrationDto.MobileNo;
            user.Address = registrationDto.Address;
            user.role = _Context.Roles.Find(registrationDto.RoleId);
            user.department = _Context.Departments.Find(registrationDto.DeptId);
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            user.IsActive = true;
            user.DOB = registrationDto.DOB;
            _Context.Users.Add(user);
            _Context.SaveChanges();
            return Created();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserDetails(int id, [FromBody] UpdateUserDto userUpdated)
        {
            User user = _Context.Users.Find(id);
            user.FirstName = userUpdated.FirstName;
            user.LastName = userUpdated.LastName;
            user.Email = userUpdated.Email;
            user.Address= userUpdated.Address;
            user.UpdatedAt= DateTime.Now;
            user.MobileNo= userUpdated.MobileNo;
            user.DOB= userUpdated.DOB;
            _Context.SaveChanges();
            return Ok("Succesfully Updated");
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return null;
        }
       
        [HttpGet("/password")]
        public string Password()
        {
            string eps = PasswordEncrypt.HashPassword("hello");
            return eps;
        }
    }
}
