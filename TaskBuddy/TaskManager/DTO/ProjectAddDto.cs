using System.ComponentModel.DataAnnotations.Schema;
using TaskManager.Models;

namespace TaskManager.DTO
{
    public class ProjectAddDto
    {
        public string ProjectTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ManagerId { get; set; }

    }
}
