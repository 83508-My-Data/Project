using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Roles")]
    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Role_Id")]
        public int RoleId { get; set; }

        [Column("Role_Name", TypeName = "varchar")]
        [StringLength(25)]
        public string RoleName { get; set; }

    }
}
