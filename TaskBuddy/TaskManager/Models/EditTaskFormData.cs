using System.ComponentModel.DataAnnotations;
using TaskManager.DTO;

namespace TaskManager.Models
{
    public class EditTaskFormData
    {
            [Required]
            public IFormFile Attachment { get; set; }

            [Required]
            public EditTask EditTaskDto { get; set; }
    }
}
