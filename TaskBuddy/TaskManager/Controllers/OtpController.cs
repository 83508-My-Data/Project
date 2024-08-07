using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;
using TaskManager.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [GlobalExceptionHandler]
    public class OtpController : ControllerBase
    {
        TaskBuddyContext _Context = null;

        public string Otp {  get; set; }    

        public OtpController(TaskBuddyContext context) { 
        
        _Context = context; 
        }


        // GET: api/<OtpController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OtpController>/5
        [HttpGet("{id}")]
        public Otp Get(int id)
        {
            return _Context.Otps.Find(id);
        }

        // POST api/<OtpController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OtpController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<OtpController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
