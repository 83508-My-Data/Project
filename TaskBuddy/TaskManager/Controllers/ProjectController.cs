using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.DTO;
using System.Collections.Generic;
using System.Collections;
using System.Reflection.Metadata.Ecma335;
using TaskManager.Filters;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [GlobalExceptionHandler]
    public class ProjectController : ControllerBase
    {
        private TaskBuddyContext _context = null;

        public ProjectController(TaskBuddyContext context)
        {
            _context = context;
        }

        // GET: api/<ProjectController>
        [HttpGet]
        public ActionResult<IEnumerable<ProjectDto>> Get()
        {
            var list = new List<ProjectDto>();

            foreach (var project in _context.Projects.ToList())
            {
                if (project.IsValid)
                {
                    ProjectDto projectdto = new ProjectDto();
                    projectdto.Id = project.Id;
                    projectdto.ProjectTitle = project.ProjectTitle;
                    projectdto.StartDate = project.StartDate;
                    projectdto.EndDate = project.EndDate;
                    projectdto.ManagerName = project.manager.FirstName + " " + project.manager.LastName;
                    list.Add(projectdto);
                }
            }
            return Ok(list);
        }



        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public ProjectDto1 projectDto1(int id)
        {
            Project project = _context.Projects.Find(id);
            if(project!=null && project.IsValid)
            {
                ProjectDto1 projectdto = new ProjectDto1();
                projectdto.Id = id;
                projectdto.ProjectTitle = project.ProjectTitle;
                projectdto.StartDate = project.StartDate;
                projectdto.EndDate = project.EndDate;
                projectdto.ManagerName = project.manager.FirstName + " " + project.manager.LastName;
                return projectdto;
            }
            return null;  
        }




        // POST api/<ProjectController>
        [HttpPost]
        public IActionResult Post([FromBody] ProjectAddDto projectDto)
        {
            Project project = new Project();
            project.IsValid = true;
            project.ProjectTitle = projectDto.ProjectTitle;
            project.StartDate = projectDto.StartDate;
            project.EndDate = projectDto.EndDate;
            project.manager = _context.Users.Find(projectDto.ManagerId);
            _context.Projects.Add(project);
            _context.SaveChanges();
            return Ok("Project Added Successfully");

        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] EditProjectDto projectUpdated)
        {
            Project projectToUpdate = _context.Projects.Find(id);
            projectToUpdate.ProjectTitle = projectUpdated.ProjectTitle;
            projectToUpdate.StartDate = projectUpdated.StartDate;
            projectToUpdate.EndDate = projectUpdated.EndDate;
           
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

        [HttpGet("/getproj/{userid}")]
        public IEnumerable<Project> Get(int userid)
        {
            var proj = (from Project in _context.Projects
                        where Project.ManagerId == userid
                        select Project).ToList<Project>();
            return proj;
        }
    }
}
