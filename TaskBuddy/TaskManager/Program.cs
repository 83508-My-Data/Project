using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);



            builder.Services.AddControllers();


<<<<<<< HEAD
            //builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
            //   builder =>
            //   {
            //       builder
            //       .WithOrigins("http://localhost:3000")
            //       .AllowAnyMethod()
            //       .AllowAnyHeader()
            //       .AllowCredentials();
            //   }));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("policy", policyBuilder =>
                {
                    policyBuilder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
=======
            builder.Services.AddDbContext<TaskBuddyContext>((options) =>
            {
                options.UseSqlServer("name=mycon");
>>>>>>> 7553ad41e6e6c294492ec682fe4ca7533de1d64d
            });



            builder.Services.AddCors(options =>
            {
                options.AddPolicy("policy", policyBuilder =>
                {
                    policyBuilder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            //var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
            //var jwtKey = builder.Configuration.GetSection("Jwt:Key").Get<string>();

            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            // .AddJwtBearer(options =>
            // {
            //     options.TokenValidationParameters = new TokenValidationParameters
            //     {
            //         ValidateIssuer = true,
            //         ValidateAudience = true,
            //         ValidateLifetime = true,
            //         ValidateIssuerSigningKey = true,
            //         ValidIssuer = jwtIssuer,
            //         ValidAudience = jwtIssuer,
            //         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            //     };
            // });


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

<<<<<<< HEAD
            app.UseCors("policy");
=======
            app.UseCors("policy"); // Apply CORS policy
>>>>>>> 7553ad41e6e6c294492ec682fe4ca7533de1d64d

            app.MapControllers();

            app.Run();
        }
    }
}
