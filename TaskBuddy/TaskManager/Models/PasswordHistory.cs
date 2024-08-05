using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Password_History")]
    public class PasswordHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Password_Id")]
        public int PasswordId { get; set; }

        [Column("User_Id", TypeName = "int")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User CurrentUser { get; set; }

        [Column("Updated_On", TypeName = "datetime")]
        public DateTime UpdatedOn { get; set; }

        [Column("Old_Password", TypeName = "varchar")]
        [StringLength(50)]
        public string OldPassword { get; set; }

        [Column("New_Password", TypeName = "varchar")]
        [StringLength(50)]
        public string NewPassword { get; set; }

    }
}
