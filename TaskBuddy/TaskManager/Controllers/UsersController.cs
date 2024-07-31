using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        public User Get(int id)
        {
            return _Context.Users.Find(id);
        }

        [HttpPost]
        public string Post([FromBody] User user)
        {
            _Context.Users.Add(user);
            _Context.SaveChanges();
            return "Added Successfully";
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
