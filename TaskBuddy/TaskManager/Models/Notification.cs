using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Notifications")]
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Notify_Id", TypeName = "int")]
        public int NotificationId { get; set; }

        [Column("Notification", TypeName = "text")]
        public string NotificationText { get; set; }

        [Column("Read_Status", TypeName = "tinyint")]
        public bool Status { get; set; }

        [Column("Created_On", TypeName = "datetime")]
        public DateTime CreatedOn { get; set; }

        [ForeignKey("User_Id_From")]
        public User UserFrom { get; set; }

        [ForeignKey("User_Id_To")]
        public User UserTo { get; set; }
    }
}
