using System.ComponentModel.DataAnnotations.Schema;
using TaskManager.Models;

namespace TaskManager.DTO
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string ProjectTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ManagerName { get; set; }

    }
}
