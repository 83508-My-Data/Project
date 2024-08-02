using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        TaskBuddyContext _context =null;

        public NotificationController( TaskBuddyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Notification> GetAll()
        {
            return _context.Notifications.ToList();
        }

        // GET api/<NotificationController>/5
        [HttpGet("{id}")]
        public Notification Get(int id)
        {
            return _context.Notifications.Find(id);
        }

        // POST api/<NotificationController>
        [HttpPost]
        public string AddNotification([FromBody] Notification notification)
        {
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
