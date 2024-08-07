using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;
using TaskManager.Filters;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [GlobalExceptionHandler]
    public class RoleController : ControllerBase
    {

        private TaskBuddyContext _Context = null;


        public RoleController(TaskBuddyContext context)
        {
            _Context = context;
        }

        [HttpGet]
        public IEnumerable<Role> Get()
        {
            return _Context.Roles.ToList();
        }

        [HttpGet("{id}")]
        public Role Get(int id)
        {
            return _Context.Roles.Find(id);
        }

        [HttpPost]
        public string Post([FromBody] Role role)
        {
            _Context.Roles.Add(role);
            _Context.SaveChanges();
            return "Added Successfully";
        }

        [HttpDelete]
        public string Delete(int id)
        {
            Role roleToBeDeleted = _Context.Roles.Find(id);
            _Context.Roles.Remove(roleToBeDeleted);
            _Context.SaveChanges();
            return "Deleted Successfully";
        }
    }

}
