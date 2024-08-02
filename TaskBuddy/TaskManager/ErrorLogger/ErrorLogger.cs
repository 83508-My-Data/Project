using System.Text.Json;

namespace TaskManager.ErrorLggers
{
    public class ErrorLogger
    {
        private static ErrorLogger Instance = new ErrorLogger();
        private ErrorLogger()
        {
        }

        public static ErrorLogger CurrentErrorLgger { get { return Instance; } }

        public void Log(string message)
        {
            string Path = "e:\\Log\\Log.json";

            var logEntry = new LogEntry
            {
                Timestamp = DateTime.Now,
                Message = message
            };




            using (var fs = new FileStream(Path, File.Exists(Path) ? FileMode.Append : FileMode.Create, FileAccess.Write))
            using (var writer = new StreamWriter(fs))
            {
                var json = JsonSerializer.Serialize(logEntry);
                writer.WriteLine(json);
            }



        }
    }
    public class LogEntry
    {
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
    }
}

