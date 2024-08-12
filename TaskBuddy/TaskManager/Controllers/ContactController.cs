using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [GlobalExceptionHandler]
    public class ContactController : ControllerBase
    {
        private TaskBuddyContext _Context = null;

        public ContactController(TaskBuddyContext Context)
        {
            _Context = Context;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _Context.Contactss.ToList();
        }


        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            return _Context.Contactss.Find(id);
        }

        [HttpPost]
        public string Post([FromBody] Contact contact)
        {
            _Context.Contactss.Add(contact);
            _Context.SaveChanges();
            return "Added Successfully";
        }
        [HttpDelete]
        public string Delete(int id)
        {
            Contact contactToBeDeleted = _Context.Contactss.Find(id);
            _Context.Contactss.Remove(contactToBeDeleted);
            _Context.SaveChanges();
            return "Deleted Successfully";
        }



    }
}
