using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
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

        [HttpPut("{id}")]
        public string Put(int id, [FromBody] User userUpdated)
        {
            User userToUpdate = _Context.Users.Find(id);
            userToUpdate.FirstName = userUpdated.FirstName;
            userToUpdate.LastName = userUpdated.LastName;
            userToUpdate.Address = userUpdated.Address;
            userToUpdate.MobileNo = userUpdated.MobileNo;
            _Context.SaveChanges();
            return "Updated Successfully";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            User userToBeDeleted = _Context.Users.Find(id);
            _Context.Users.Remove(userToBeDeleted);
            _Context.SaveChanges();
            return "Deleted Successfully";
        }
        [HttpGet("/error")]
        public void Error()
        {
            ErrorLogger el = ErrorLogger.CurrentErrorLgger;
            el.Log("hello how are you");
        }
        [HttpGet("/password")]
        public string Password()
        {
            string eps = PasswordEncrypt.HashPassword("hello");
            return eps;
        }

        [HttpPost("/Register")]
        public IActionResult Register([FromBody] User user)
        {
            _Context.Users.Add(user);
            _Context.SaveChanges();
            return Created();
        }
    }
}
