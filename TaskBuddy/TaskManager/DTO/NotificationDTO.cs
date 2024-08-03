using TaskManager.Models;

namespace TaskManager.DTO
{
    public class NotificationDTO
    {
        public string Notification { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
     
        public int UserIdFrom { get; set; }

        public int UserIdTo { get; set; }

            
    }
}
