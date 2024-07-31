using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table(name: "Tasks")]
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(name: "Task_Id")]
        public int TaskId { get; set; }

        [Column(name: "Title", TypeName = "varchar")]
        [StringLength(30)]
        public string Title { get; set; }

        [Column(name: "Description", TypeName = "text")]
        public string Description { get; set; }

        [Column(name: "Attachment", TypeName = "varchar")]
        [StringLength(500)]
        public string AttachmentPath { get; set; }

        [Column(name: "Status", TypeName = "tinyint")]
        public bool Status { get; set; }

        [Column(name: "Upload_At", TypeName = "datetime")]
        public DateTime UploadAt { get; set; }

        [Column(name: "Update_At", TypeName = "datetime")]
        public DateTime UpdateAt { get; set; }

        [Column(name: "Priority", TypeName = "int")]
        public int Priority { get; set; }

        [ForeignKey("TaskCategory_Id")]
        public TaskCategory Category { get; set; }

        [ForeignKey("Project_Id")]
        public Project WorkingProject { get; set; }

        [ForeignKey("User_Id")]
        public User CurrentUser { get; set; }

        [Column(name: "Comment", TypeName = "varchar")]
        [StringLength(300)]
        public string Comment { get; set; }
    }
}
