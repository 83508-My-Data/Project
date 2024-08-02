using Microsoft.Extensions.Logging.Abstractions;
using System.Text.Json;

namespace WebApplication1.Logger
{
    public class Logger
    {
        private static Logger Instance = new Logger();
        private readonly string Path = "d:\\Log\\Log.json";
        private Logger()
        {
        }

        public static Logger CurrentLogger { get { return Instance; } }

        public void Log(string message)
        {
            
            try
            {
                var logEntry = new LogEntry
                {
                    Timestamp = DateTime.Now,
                    Message = message
                };

                
                lock (Instance)
                {
                    
                    using (var fs = new FileStream(Path, File.Exists(Path) ? FileMode.Append : FileMode.Create, FileAccess.Write))
                    using (var writer = new StreamWriter(fs))
                    {
                        var json = JsonSerializer.Serialize(logEntry);
                        writer.WriteLine(json);
                    }
                }
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("An error occurred while logging: " + ex.Message);
            }
        }
    }
    public class LogEntry
    {
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
    }
}

