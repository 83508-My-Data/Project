using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private TaskBuddyContext _Context = null;

        public DepartmentController(TaskBuddyContext context)
        {
            _Context = context;
        }
        // GET: api/<DepartmentController>
        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return _Context.Departments.ToList();
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public Department Get(int id)
        {
            return _Context.Departments.Find(id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public string Post([FromBody] Department department
            )
        {
            _Context.Departments.Add(department);
            _Context.SaveChanges();
            return "Department added Successfully";

        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Department departmentUpdated)
        {
            Department departmentToUpdate = _Context.Departments.Find(id);
            departmentToUpdate.DepartmentName=departmentUpdated.DepartmentName;
            departmentUpdated.Description=departmentToUpdate.Description;
            _Context.SaveChanges();
            return "Department Updated Successfully";

        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            Department departmentToDelete = _Context.Departments.Find(id);
            _Context.Departments.Remove(departmentToDelete);
            _Context.SaveChanges();
            return "Department Deleted successfully";
        }
    }
}
