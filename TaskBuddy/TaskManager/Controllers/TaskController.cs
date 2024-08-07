using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using TaskManager.Models;


namespace TaskManager.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class TaskController : ControllerBase
    {



        TaskBuddyContext _Context = null;

        public TaskController(TaskBuddyContext context)
        {
            _Context = context;
        }
        // GET: api/<TaskController>
        [HttpGet]
        public IEnumerable<Tasks> Get()
        {
            return _Context.TaskList.ToList();
        }
        [HttpGet("/pendingtask")]
        public IEnumerable<Tasks> GetPendingTask()
        {
            var task= (from Tasks in _Context.TaskList
                       where Tasks.Status == false
                       select Tasks).ToList<Tasks>();
            return task;
        }
        [HttpGet("/completedtask")]
        public IEnumerable<Tasks> GetCompletedTask()
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        // GET api/<TaskController>/5
        [HttpGet("{userid}")]
        public IEnumerable<Tasks> Get(int userid)
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.UserId == userid
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpPost("/addtask")]
        public IActionResult Post([FromForm] TaskFormData formData)
        {
            if (formData.Attachment != null && formData.Attachment.Length > 0)
            {

                var filePath = Path.Combine("Upload\\Files\\", formData.Attachment.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    formData.Attachment.CopyToAsync(stream);
                }
            }

            var taskDto = formData.TaskDto;

            var task = new Tasks
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                Status = false,
                Comment = taskDto.Comment,
                Priority = taskDto.Priority,
                AttachmentPath = formData.Attachment?.FileName,
                TaskCategoryId = taskDto.TaskCategoryId,
                UpdateAt = DateTime.Now,
                UploadAt = DateTime.Now,
                ProjectId = taskDto.ProjectId,
                UserId = taskDto.UserId
            };

            _Context.Add(task);
            _Context.SaveChanges();
            return Ok("Created successfully");
        }
        // PUT api/<TaskController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TaskController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Tasks taskToBeDeleted = _Context.TaskList.Find(id);
            if (!taskToBeDeleted.IsValid)
            {
                return Ok("Already Deleted");
            }
            taskToBeDeleted.IsValid = false;
            _Context.SaveChanges();
            return Ok("task Deleted");
        }
        [HttpGet("/DownloadFile/{id}")]
      
        public async Task<IActionResult> DownloadFile(int id)
        {
            var task = _Context.TaskList.Find(id);
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", task.AttachmentPath);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }

    }
}