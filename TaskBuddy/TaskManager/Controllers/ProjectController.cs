using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private TaskBuddyContext _context = null;

        public ProjectController(TaskBuddyContext context)
        {
            _context = context;
        }


        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return _context.Projects.ToList();
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _context.Projects.Find(id);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public string Post([FromBody] Project project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();
            return "Project Added Successfully";

        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Project projectUpdated)
        {
            Project projectToUpdate = _context.Projects.Find(id);
            projectUpdated.ProjectTitle=projectUpdated.ProjectTitle;
            projectUpdated.StartDate=projectUpdated.StartDate;
            projectUpdated.EndDate=projectUpdated.EndDate;
            projectUpdated.ManagerId=projectUpdated.ManagerId;
            _context.SaveChanges();
            return "Project details updated";
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
           Project projectToDelete= _context.Projects.Find(id);
           _context.Projects.Remove(projectToDelete);
            _context.SaveChanges();
            return "Project deleted successfully";
        }
    }
}
