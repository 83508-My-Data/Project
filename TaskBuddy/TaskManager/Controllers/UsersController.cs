using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskBuddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private TaskBuddyContext _Context = null;

        public UsersController(TaskBuddyContext context) 
        {
            _Context = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _Context.Users.ToList();
        }

        [HttpGet("{id}")]
        public UserDto Get(int id)
        {
            User user = _Context.Users.Find(id);
            UserDto userDto = new UserDto();
            userDto.FirstName = user.FirstName;
            userDto.LastName = user.LastName;
            userDto.Email = user.Email;
            userDto.Address = user.Address;
            userDto.UserId = user.UserId;
            userDto.MobileNo = user.MobileNo;
            return userDto;
        }

        [HttpPost]
        public UserDto Login([FromBody] Login loginUser )
        {
            UserDto u =new UserDto();
            foreach (var user in _Context.Users) 
            { 
                if(user.Email.Equals(loginUser.Email) && user.Password.Equals(loginUser.Password))
                {
                    Console.WriteLine(user);
                    u.Email = user.Email;
                    u.FirstName = user.FirstName;
                    u.LastName = user.LastName; 
                    u.Address = user.Address;
                    
                }
            }
            return u;
        }

        [HttpPut("{id}")]
        public string Put(int id, [FromBody] User userUpdated)
        {
            User userToUpdate=_Context.Users.Find(id);
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
       
    }
}
