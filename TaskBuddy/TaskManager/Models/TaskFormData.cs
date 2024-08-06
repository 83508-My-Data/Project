using System.ComponentModel.DataAnnotations;
using TaskManager.DTO;

namespace TaskManager.Models
{
    public class TaskFormData
    {
        [Required]
        public IFormFile Attachment { get; set; }

        [Required]
        public TaskDto TaskDto { get; set; }
    }
}
