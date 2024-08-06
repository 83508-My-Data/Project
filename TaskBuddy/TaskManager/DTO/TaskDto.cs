using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TaskManager.Models;

namespace TaskManager.DTO
{
    public class TaskDto
    {
        
       
        public string Title { get; set; }
        public string Description { get; set; }
        public string AttachmentPath { get; set; }
        public bool Status { get; set; }
        public int Priority { get; set; }
        public int TaskCategoryId { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; }
        public bool IsValid {  get; set; }
    }
}
