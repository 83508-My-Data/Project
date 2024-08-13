using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using TaskManager.Models;
using TaskManager.Filters;
using Microsoft.SqlServer.Server;
using TaskManager.DTO;
using TaskManager.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace TaskManager.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [GlobalExceptionHandler]
    public class TaskController : ControllerBase
    {

        TaskBuddyContext _Context = null;

        public TaskController(TaskBuddyContext context)
        {
            _Context = context;
        }
       

        [HttpGet]
        public IEnumerable<Tasks> Get()
        {
            return (from Tasks in _Context.TaskList
                    where Tasks.IsValid == true
                    select Tasks).ToList();
        }

        [HttpGet("/pendingtask")]
        public IEnumerable<Tasks> GetPendingTask()
        {
            var task= (from Tasks in _Context.TaskList
                       where Tasks.Status == false && Tasks.IsValid == true
                       select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/pendingtask/{id}")]
        public IEnumerable<Tasks> GetPendingTask(int id)
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == false && Tasks.UserId == id && Tasks.Deadline > DateTime.Now && Tasks.IsValid == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/uncompletedtask")]
        public IEnumerable<Tasks> GetUncompletedTask()
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == false && Tasks.Deadline < DateTime.Now && Tasks.IsValid == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/uncompletedtask/{id}")]
        public IEnumerable<Tasks> GetUncompletedTask(int id)
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == false && Tasks.UserId == id && Tasks.Deadline < DateTime.Now && Tasks.IsValid == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/completedtask")]
        public IEnumerable<Tasks> GetCompletedTask()
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == true && Tasks.IsValid == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/completedtask/{id}")]
        public IEnumerable<Tasks> GetCompletedTask(int id)
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.Status == true && Tasks.UserId == id && Tasks.Deadline > DateTime.Now && Tasks.IsValid == true
                        select Tasks).ToList<Tasks>();
            return task;
        }

        [HttpGet("/editLoad/{id}")]
        public Tasks loadTask(int id)
        {
            var task =_Context.TaskList.Find(id);
            if (task.IsValid)
            {
                return task;
            }
            return null;
        }

        // GET api/<TaskController>/5
        [HttpGet("{userid}")]
        public IEnumerable<Tasks> Get(int userid)
        {
            var task = (from Tasks in _Context.TaskList
                        where Tasks.UserId == userid && Tasks.Deadline > DateTime.Now && Tasks.IsValid == true
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
                    stream.Close();
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
                UserId = taskDto.UserId,
                IsValid = true,
                Deadline = taskDto.Deadline
            };

            _Context.Add(task);
            _Context.SaveChanges();
            return Ok("Created successfully");
        }
        // PUT api/<TaskController>/5
        [HttpPut("{id}")]
        public ApiResponse<string> editTask(int id, [FromForm] EditTaskFormData formData)
        {
            Tasks task = _Context.TaskList.Find(id);
            if (task != null && task.IsValid == true)
            {
                if (formData.Attachment != null && formData.Attachment.Length > 0)
                {
                    var filePath = Path.Combine("Upload\\Files\\", formData.Attachment.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        formData.Attachment.CopyToAsync(stream);
                        stream.Close();
                    }
                }

                var editTask = formData.EditTaskDto;

                task.Priority = editTask.Priority;
                task.AttachmentPath = formData.Attachment?.FileName;
                task.UpdateAt = DateTime.Now;
                task.Category = _Context.TaskCategories.Find(editTask.TaskCategoryId);
                task.CurrentUser = _Context.Users.Find(editTask.UserId);
                task.Deadline = editTask.Deadline;
                _Context.SaveChanges();
                return new ApiResponse<string> { status = true, Msg = "Success", result = "Edited Successfully" };
            }
            return new ApiResponse<string> { status = false, Msg = "Error", result = "Edited Failed" };
        }

        // DELETE api/<TaskController>/5
        [HttpDelete("{id}")]
        public ApiResponse<string> Delete(int id)
        {
            Tasks taskToBeDeleted = _Context.TaskList.Find(id) ?? throw new CustomExceptions("Invalid");
            if (!taskToBeDeleted.IsValid)
            {
                return new ApiResponse<string> { status= false, Msg= "Already Deleted" , result = "Invalid"};
            }
            taskToBeDeleted.IsValid = false;
            _Context.SaveChanges();
            return new ApiResponse<string> { status= true , Msg= "Successfully Deleted", result= "Success"};
        }

        [HttpPut("/status/{id}")]
        public string UpdateStatus(int id)
        {
            Tasks task = _Context.TaskList.Find(id);
            if(task != null && task.IsValid == true)
            {
                task.Status = true;
                _Context.SaveChanges();
                return "Success";
            }
            return null;
        }

        [HttpPut("/status/reset/{id}")]
        public string ResetStatus(int id)
        {
            Tasks task = _Context.TaskList.Find(id);
            if (task != null && task.IsValid == true)
            {
                task.Status = false;
                _Context.SaveChanges();
                return "Reset Successful";
            }
            return null;
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