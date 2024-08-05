using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{

    [Table("TaskCategorys")]
    public class TaskCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TaskCategory_Id")]
        public int TaskCategoryId { get; set; }

        [Column("Task_Name", TypeName = "varchar")]
        [StringLength(30)]
        public string TaskName { get; set; }
    }
}
