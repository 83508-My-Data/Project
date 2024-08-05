using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Project")]
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Project_Id")]
        public int Id { get; set; }

        [Column("Project_Title")]
        public string ProjectTitle { get; set; }

        [Column("Start_Date", TypeName = "datetime")]
        public DateTime StartDate { get; set; }

        [Column("End_Date", TypeName = "datetime")]
        public DateTime EndDate { get; set; }

        [Column("Manager_Id", TypeName ="int")]
        public int ManagerId { get; set; }
        
        [ForeignKey("ManagerId")]
        public virtual User manager { get; set; }
        public bool IsValid { get; set; }

    }
}
