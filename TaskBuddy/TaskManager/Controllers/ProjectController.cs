using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.DTO;
using System.Collections.Generic;
using System.Collections;
using System.Reflection.Metadata.Ecma335;


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
        /* public IEnumerable<Project> Get()
         {
             return _context.Projects.ToList();
         }*/
        [HttpGet]
        public ActionResult<IEnumerable<ProjectDto1>> Get()
        {
            List<ProjectDto1> list = new List<ProjectDto1>();

            foreach (var proj in _context.Projects)
            {
                if (proj.IsValid)
                {
                    list.Add(new ProjectDto1
                    {
                        Id = proj.Id,
                        ProjectTitle = proj.ProjectTitle,
                        StartDate = proj.StartDate,
                        EndDate = proj.EndDate,
                        ManagerId = proj.ManagerId

                    });
                }
            }

            return Ok(list);
        }


        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        /* public Project Get(int id)
         {
             return _context.Projects.Find(id);
         }*/
        public ActionResult<ProjectDto1> Get(int id)
        {
            var project = _context.Projects
                                     .Where(d => d.IsValid && d.Id == id)
                                     .Select(d => new ProjectDto1
                                     {
                                         Id = d.Id,
                                         ProjectTitle = d.ProjectTitle,
                                         StartDate = d.StartDate,
                                         EndDate = d.EndDate,
                                         ManagerId = d.ManagerId
                                     })
                                     .FirstOrDefault();

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }




        // POST api/<ProjectController>
        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            project.IsValid = true;

            _context.Projects.Add(project);
            _context.SaveChanges();
            return Ok("Department Added Successfully");

        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Project projectUpdated)
        {
            Project projectToUpdate = _context.Projects.Find(id);
            projectUpdated.ProjectTitle = projectUpdated.ProjectTitle;
            projectUpdated.StartDate = projectUpdated.StartDate;
            projectUpdated.EndDate = projectUpdated.EndDate;
            projectUpdated.ManagerId = projectUpdated.ManagerId;
            _context.SaveChanges();
            return "Project details updated";
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            Project projectToBeDeleted = _context.Projects.Find(id);
            if (!projectToBeDeleted.IsValid)
            {
                return Ok("Already Deleted");
            }
            projectToBeDeleted.IsValid = false;
            _context.SaveChanges();
            return Ok("Department Deleted");
        }
    }
}
