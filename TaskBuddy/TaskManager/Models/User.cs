﻿using System.ComponentModel.DataAnnotations;
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
        [StringLength(50)]
        public string FirstName { get; set; }

        [Column("Last_Name", TypeName = "varchar")]
        [StringLength(50)]
        public string LastName { get; set; }

        [Column("Email", TypeName = "varchar")]
        [StringLength(250)]
        public string Email { get; set; }

        [Column("Password", TypeName = "varchar")]
        [StringLength(25)]
        public string Password { get; set; }

        [Column("Mobile_No", TypeName = "char")]
        [StringLength(10)]
        public string MobileNo { get; set; }

        [Column("Role_Id", TypeName = "int")]
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role role { get; set; }

        [Column("Dept_Id", TypeName = "int")]
        public int DeptId { get; set; }

        [ForeignKey("DeptId")]
        public virtual Department department { get; set; }

        [Column("Address", TypeName = "text")]
        public string Address { get; set; }

        [Column("Created_At", TypeName = "datetime")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("Update_At", TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [Column("Is_Active", TypeName = "tinyint")]
        public bool IsActive { get; set; }

        [Column("Manager_Id", TypeName = "int")]
        public int? ManagerId { get; set; }

        [ForeignKey("ManagerId")]
        public virtual User Manager { get; set; }

        [Column(TypeName = "date")]
        public DateOnly DOB { get; set; }
    }
}
