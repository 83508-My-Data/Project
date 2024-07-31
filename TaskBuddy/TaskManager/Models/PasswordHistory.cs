using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table(name: "Password_History")]
    public class PasswordHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(name: "Password_Id")]
        public int PasswordId { get; set; }

        [ForeignKey("User_Id")]
        public User CurrentUser { get; set; }

        [Column(name: "Updated_On", TypeName = "datetime")]
        public DateTime UpdatedOn { get; set; }

        [Column(name: "Old_Password", TypeName = "varchar")]
        [StringLength(50)]
        public string OldPassword { get; set; }

        [Column(name: "New_Password", TypeName = "varchar")]
        [StringLength(50)]
        public string NewPassword { get; set; }

    }
}
