using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        TaskBuddyContext _Context =null;

        public DepartmentController(TaskBuddyContext context)
        {
            _Context = context;    
        }

        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return _Context.Departments.ToList();
        }

        
        [HttpGet("{id}")]
        public Department Get(int id)
        {
            return _Context.Departments.Find(id);
        }

        [HttpPost]
        public string Add([FromBody] Department department)
        {
            _Context.Departments.Add(department);
            _Context.SaveChanges();
            return "Successfully Department Added";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            Department departmentToBeDeleted=_Context.Departments.Find(id);
            _Context.Departments.Remove(departmentToBeDeleted);
            _Context.SaveChanges();
            return "Department Deleted";
        }
    }
}
