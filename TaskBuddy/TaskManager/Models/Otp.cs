using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Otps")]
    public class Otp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Otp_Id")]
        public int OtpId { get; set; }

        [Column("User_Id", TypeName = "int")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User CurrentUser { get; set; }

        [Column("Otp", TypeName = "varchar")]
        [StringLength(50)]
        public string OtpValue { get; set; }

        [Column("Generated_On", TypeName = "datetime")]
        public DateTime GeneratedOn { get; set; }

        [Column("Valid_Till", TypeName = "datetime")]
        public DateTime ValidTill { get; set; }
    }
}
