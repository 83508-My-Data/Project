using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{

    [Table(name: "TaskCategorys")]
    public class TaskCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(name: "TaskCategory_Id")]
        public int TaskCategoryId { get; set; }

        [Column(name: "Task_Name", TypeName = "varchar")]
        [StringLength(30)]
        public string TaskName { get; set; }
    }
}
