using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class TaskCategoryController : ControllerBase
    {
        private TaskBuddyContext _Context = null;

        public TaskCategoryController(TaskBuddyContext context)
        {
                _Context = context;
        }

        [HttpGet]
        public IEnumerable<TaskCategory> Get()
        {
            return _Context.TaskCategories.ToList();

        }

        [HttpGet("{id}")]
        public TaskCategory Get(int id)
        {
            return  _Context.TaskCategories.Find(id);
        }

        
        [HttpPost]

        public string Post([FromBody] TaskCategory taskCategory) {

            _Context.TaskCategories.Add(taskCategory);
            _Context.SaveChanges();
            return "Added Successfully";
        
        }
    }
}
