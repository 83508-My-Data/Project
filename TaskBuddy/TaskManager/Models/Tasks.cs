using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Tasks")]
    public class Tasks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Task_Id")]
        public int TaskId { get; set; }

        [Column("Title", TypeName = "varchar")]
        [StringLength(30)]
        public string Title { get; set; }

        [Column("Description", TypeName = "text")]
        public string Description { get; set; }

        [Column("Attachment", TypeName = "varchar")]
        [StringLength(500)]
        public string AttachmentPath { get; set; }

        [Column("Status", TypeName = "tinyint")]
        public bool Status { get; set; }

        [Column("Upload_At", TypeName = "datetime")]
        public DateTime UploadAt { get; set; }

        [Column("Update_At", TypeName = "datetime")]
        public DateTime UpdateAt { get; set; }

        [Column("Priority", TypeName = "int")]
        public int Priority { get; set; }

        [Column("TaskCategory_Id", TypeName = "int")]
        public int TaskCategoryId { get; set; }

        [ForeignKey("TaskCategory_Id")]
        public virtual TaskCategory Category { get; set; }

        [Column("Project_Id", TypeName = "int")]
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project WorkingProject { get; set; }

        [Column("User_Id", TypeName = "int")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User CurrentUser { get; set; }

        [Column("Comment", TypeName = "varchar")]
        [StringLength(300)]
        public string Comment { get; set; }
    }
}
