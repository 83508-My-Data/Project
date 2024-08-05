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

        [Column("User_Id_From", TypeName = "int")]
        public int UserIdFrom { get; set; }

        [ForeignKey("UserIdFrom")]
        public virtual User UserFrom { get; set; }

        [Column("User_Id_To", TypeName = "int")]
        public int UserIdTo { get; set; }

        [ForeignKey("UserIdTo")]
        public virtual User UserTo { get; set; }
    }
}
