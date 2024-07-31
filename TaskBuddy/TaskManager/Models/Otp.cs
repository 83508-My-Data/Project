using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table(name: "Otps")]
    public class Otp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(name: "Otp_Id")]
        public int OtpId { get; set; }

        [Column(name: "User_Id")]
        public User CurrentUser { get; set; }

        [Column(name: "Otp", TypeName = "varchar")]
        [StringLength(50)]
        public string OtpValue { get; set; }

        [Column(name: "Generated_On", TypeName = "datetime")]
        public DateTime GeneratedOn { get; set; }

        [Column(name: "Valid_Till", TypeName = "datetime")]
        public DateTime ValidTill { get; set; }
    }
}
