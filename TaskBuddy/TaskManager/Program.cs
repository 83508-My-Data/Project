
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<TaskBuddyContext>((option) => { option.UseSqlServer("name=mycon"); });

            builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
               builder =>
               {
                   builder
                   .WithOrigins("http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
               }));

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


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

            app.UseCors("CorsPolicy");

            app.MapControllers();

            //app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.Run();
        }
    }
}
