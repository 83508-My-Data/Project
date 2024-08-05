using System.ComponentModel.DataAnnotations.Schema;
using TaskManager.Models;

namespace TaskManager.DTO
{
    public class ProjectDto1
    {
        public int Id { get; set; }
        public string ProjectTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual string ManagerName { get; set; }
       
        
    }
}
