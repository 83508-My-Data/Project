using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
    public class TaskBuddyContext : DbContext
    {
        public TaskBuddyContext(DbContextOptions option) : base(option)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Otp> Otps { get; set; }

        public DbSet<PasswordHistory> PasswordHistory { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<TaskCategory> TaskCategories { get; set; }
    }
}
