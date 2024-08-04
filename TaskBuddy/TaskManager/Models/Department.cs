

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    [Table("Department")]
    public class Department
    {
        [Key]
        [Column("Dept_Id", TypeName = "int")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartmentId { get; set; }

        [Column("Dept_Name", TypeName = "varchar")]
        [StringLength(25)]
        public string DepartmentName { get; set; }

        [Column("Description", TypeName = "text")]
        public string Description { get; set; }
        
        [Column(TypeName = "bit")]
        public bool IsValid { get; set; }

    }
}
