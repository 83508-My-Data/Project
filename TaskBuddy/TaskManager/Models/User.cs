using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("User_Id")]
        public int UserId { get; set; }

        [Column("First_Name", TypeName = "varchar")]
        [StringLength(25)]
        public string FirstName { get; set; }

        [Column("Last_Name", TypeName = "varchar")]
        [StringLength(25)]
        public string LastName { get; set; }

        [Column("Email", TypeName = "varchar")]
        [StringLength(25)]
        public string Email { get; set; }

        [Column("Password", TypeName = "varchar")]
        [StringLength(25)]
        public string Password { get; set; }

        [Column("Mobile_No", TypeName = "char")]
        [StringLength(10)]
        public string MobileNo { get; set; }

        [ForeignKey("Role_Id")]
        public Role role { get; set; }

        [ForeignKey("Dept_Id")]
        public Department department { get; set; }

        [Column("Address", TypeName = "text")]
        public string Address { get; set; }
    }
}
