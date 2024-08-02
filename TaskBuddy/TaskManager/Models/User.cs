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

        [Column("Created_At", TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }= DateTime.Now;

        [Column("Update_At", TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; }=DateTime.Now;

        [Column("Is_Active", TypeName = "tinyint")]
        public bool IsActive { get; set; }

        [ForeignKey("Manager_Id")]
        public User ManagerId { get; set; }

        [Column(TypeName = "date")]
        public DateOnly DOB {  get; set; }
    }
}
