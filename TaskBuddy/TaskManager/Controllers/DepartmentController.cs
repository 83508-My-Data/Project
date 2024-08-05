using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.DTO;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        TaskBuddyContext _Context = null;

        public DepartmentController(TaskBuddyContext context)
        {
            _Context = context;
        }

        [HttpGet]
        /* public IEnumerable<Department> Get()
         {
             return _Context.Departments.ToList();
         }*/

        public IEnumerable<DepartmentDto1> Get()
        {
            List<DepartmentDto1> list = new List<DepartmentDto1>();
            foreach (var Dept in _Context.Departments)
            {
                if (Dept.IsValid)
                {
                    list.Add(new DepartmentDto1
                    {
                        DepartmentId = Dept.DepartmentId,
                        DepartmentName = Dept.DepartmentName,
                        Description = Dept.Description
                    });
                }
            }

            return list;


            /*.Where(d => d.IsValid)
            .Select(d => new DepartmentDto
            {
                DepartmentName = d.DepartmentName
            })
            .ToList();*/
        }


        /*[HttpGet("{id}")]
        public Department Get(int id)
        {
            return _Context.Departments.Find(id);
        }*/

        [HttpGet("{id}")]
        public ActionResult<DepartmentDto1> Get(int id)
        {
            var department = _Context.Departments
                                     .Where(d => d.IsValid && d.DepartmentId == id)
                                     .Select(d => new DepartmentDto1
                                     {
                                         DepartmentId = d.DepartmentId,
                                         DepartmentName = d.DepartmentName,
                                         Description = d.Description
                                     })
                                     .FirstOrDefault();

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Department department)
        {
            //department.DepartmentId = 0;
            department.IsValid = true;
            _Context.Departments.Add(department);
            _Context.SaveChanges();
            return Ok("Department Added Successfully");
        }

        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            Department departmentToBeDeleted = _Context.Departments.Find(id);
            if (!departmentToBeDeleted.IsValid)
            {
                return Ok("Already Deleted");
            }
            departmentToBeDeleted.IsValid = false;
            _Context.SaveChanges();
            return Ok("Department Deleted");
        }

        public class DepartmentDto1
        {
            public int DepartmentId { get; internal set; }
            public string DepartmentName { get; internal set; }
            public string Description { get; internal set; }
        }
    }
}
