using Microsoft.AspNetCore.Mvc;
using TaskManager.DTO;
using TaskManager.Models;
using TaskManager.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [GlobalExceptionHandler]
    public class NotificationController : ControllerBase
    {
        TaskBuddyContext _context =null;

        public string Notification { get; private set; }

        public NotificationController( TaskBuddyContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IEnumerable<NotificationDTO> Get()
        {
            List<NotificationDTO> result = new List<NotificationDTO>();
            foreach (var notification in _context.Notifications)
            {
                NotificationDTO dto = new NotificationDTO
                {
                    Notification = notification.NotificationText
                };

                result.Add(dto);
            }

            return result;
        }

        // GET api/<NotificationController>/5
        [HttpGet("{id}")]
        public Notification Get(int id)
        {
            return _context.Notifications.Find(id);
        }

        // POST api/<NotificationController>
        [HttpPost]
        public string AddNotification([FromBody] NotificationDTO notificationdto)
        {
            Notification notification = new Notification();
            notification.NotificationText = notificationdto.Notification;
            notification.Status = false;
            notification.UserFrom = _context.Users.Find(notificationdto.UserIdFrom);
            notification.UserTo = _context.Users.Find(notificationdto.UserIdFrom);
            notification.CreatedOn = DateTime.Now;
            _context.Notifications.Add(notification);
            _context.SaveChanges();
            return "Succesfully Added";
        }

        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<NotificationController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            Notification notificationToBeDeleted=_context.Notifications.Find(id);
            _context.Notifications.Remove(notificationToBeDeleted);
            _context.SaveChanges();
            return "Notification Deleted";
        }
    }
}
