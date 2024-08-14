using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManager.DTO;
using TaskManager.ErrorLggers;
using TaskManager.Models;
using TaskManager.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskBuddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [GlobalExceptionHandler]
    // [EnableCors("policy")]
    public class UsersController : ControllerBase
    {
        private TaskBuddyContext _Context = null;
        private IConfiguration _config;

        public UsersController(TaskBuddyContext context, IConfiguration config)
        {
            _Context = context;
            _config = config;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _Context.Users.ToList();
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _Context.Users.Find(id);
        }

        [HttpPost("/login")]
        public ApiResponse<LoginResponseDto> Login([FromBody] Login loginUser)
        {
            var user = _Context.Users.Where(u => u.Email.Equals(loginUser.Email) && u.Password.Equals(PasswordEncrypt.HashPassword(loginUser.Password))).FirstOrDefault();
            if (user != null)
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);
                var generatedtoken = new JwtSecurityTokenHandler().WriteToken(Sectoken);

                return new ApiResponse<LoginResponseDto> { status = true , Msg = user.FirstName +" "+ user.LastName+" "+"Logged In" , result = new LoginResponseDto { role = user.role,userId=user.UserId, token = generatedtoken } };
            }
            else
            {
                return new ApiResponse<LoginResponseDto> { status = false, Msg = "Invalid Credentials",result = null };
            }
        }

        [HttpPost("/register")]
        public ApiResponse<string> RegisterUser([FromBody] RegistrationDto registrationDto) 
        { 
            User user = new User();
            user.FirstName = registrationDto.FirstName;
            user.LastName = registrationDto.LastName;
            user.Email = registrationDto.Email;
            user.Password = PasswordEncrypt.HashPassword(registrationDto.Password);
            user.MobileNo = registrationDto.MobileNo;
            user.Address = registrationDto.Address;
            user.role = _Context.Roles.Find(registrationDto.RoleId);
            user.department = _Context.Departments.Find(registrationDto.DeptId);
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            user.IsActive = true;
            user.DOB = registrationDto.DOB;
            foreach (var emp in _Context.Users)
            {
                if (emp.Email.Equals(user.Email) && emp.MobileNo.Equals(user.MobileNo))
                {
                    return new ApiResponse<string> { status = false, Msg = "Email and Mobile Number Already Registered", result = "Register Again" };
                }
                else if (emp.Email.Equals(user.Email))
                {
                    return new ApiResponse<string> { status = false, Msg = "Email Already Registered", result = "Register Again" };
                }
                else if (emp.MobileNo.Equals(user.MobileNo))
                {
                    return new ApiResponse<string> { status = false, Msg = "Mobile Already Registered", result = "Register Again" };
                }
                
            }
            _Context.Users.Add(user);
            _Context.SaveChanges();
            return new ApiResponse<string> { status = true, Msg = "Successfully Added", result = "Created"};
        }

        [HttpPut("{id}")]
        public ApiResponse<string> UpdateUserDetails(int id, [FromBody] UpdateUserDto userUpdated)
        {
            User user = _Context.Users.Find(id);
            user.FirstName = userUpdated.FirstName;
            user.LastName = userUpdated.LastName;
            user.Email = userUpdated.Email;
            user.Address= userUpdated.Address;
            user.UpdatedAt= DateTime.Now;
            user.MobileNo= userUpdated.MobileNo;
            user.DOB= userUpdated.DOB;
            foreach (var emp in _Context.Users)
            {
                if (!userUpdated.Email.Equals(emp.Email))
                {
                    if (emp.Email.Equals(user.Email))
                    {
                        return new ApiResponse<string> { status = false, Msg = "Email Already Registered", result = "Change Email" };
                    }
                }
            }
                _Context.SaveChanges();
            return new ApiResponse<string> { status = true, Msg = "Successfully Updated", result = "Updated" };
        }

        [HttpPut("/password/{id}")]
        public IActionResult UpdatePassword( int id, [FromBody] UpdatePasswordDTO updatePasswordDTO )
        {
            User user = _Context.Users.Find(id);
            string OldPassword = user.Password;
            if (!OldPassword.Equals(PasswordEncrypt.HashPassword(updatePasswordDTO.OldPassword)))
            {
                return Ok(new { error = "Old Password Not Matched" });
            }
            user.Password = PasswordEncrypt.HashPassword(updatePasswordDTO.NewPassword);
            _Context.SaveChanges();
            return Ok("Password Updated");
        }

        [HttpDelete("{id}")]
        public string DeactivateUser(int id)
        {
            User userToBeDeactivated=_Context.Users.Find(id);
            userToBeDeactivated.IsActive = false;
            _Context.SaveChanges();
            return "User Is Deleted";
        }
        [HttpGet("/getuserdept/{mngid}")]
        public IEnumerable<User> GetUserDept(int mngid)
        {
            var user = _Context.Users.Find(mngid);
            int dept = user.DeptId;
            var users = (from User in _Context.Users
                         where User.DeptId == dept && User.UserId != mngid && User.ManagerId == null && User.RoleId == 2
                         select User).ToList<User>();
            return users;
        }
        [HttpPost("/addemp")]
        public string AddEmpMyTeam([FromBody]AddMyTeamDto myteam)
        {
            User userToBeAdded = _Context.Users.Find(myteam.userId);
            userToBeAdded.ManagerId = myteam.mngId;
            _Context.SaveChanges();
            return "Employee Is added to team";
        }
        [HttpGet("/getuser/{mngId}")]
        public IEnumerable<User> GetUser(int mngId)

        {
            var users = (from User in _Context.Users
                         where User.ManagerId == mngId
                         select User).ToList<User>();
            return users;
        }

        [HttpPut("/updatepass")]
        public string UpdatePassOtp([FromBody] OtpPassword otppassword)

        {
            var user = (from User in _Context.Users
                        where User.Email == otppassword.Email
                        select User).FirstOrDefault();
            var otpuser = _Context.Otps
    .Where(o => o.UserId == user.UserId)
    .OrderByDescending(o => o.GeneratedOn)
    .FirstOrDefault();
            if (otpuser.OtpValue == otppassword.otp)
            {
                user.Password = PasswordEncrypt.HashPassword(otppassword.NewPassword);

                _Context.SaveChanges();
                return "password updated successfully";
            }
            return "password not updated successfully";


        }
    }
}
