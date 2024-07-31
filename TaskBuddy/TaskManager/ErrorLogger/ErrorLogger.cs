using System.Text.Json;

namespace _00DemoMVC.ErrorLggers
{
    public class ErrorLgger
    {
        private static ErrorLgger Instance = new ErrorLgger();
        private ErrorLgger()
        {
        }

        public static ErrorLgger CurrentErrorLgger { get { return Instance; } }

        public void Log(string message)
        {
            string path = "c:\\Log\\Log.txt";

            FileStream fs = null;
            if (File.Exists(path))
            {
                fs = new FileStream(path, FileMode.Append, FileAccess.Write);
            }
            else
            {
                fs = new FileStream(path, FileMode.Create, FileAccess.Write);
            }

            StreamWriter writer = new StreamWriter(fs);
            var LogMessage = String.Format("Logged at {0} : {1}", DateTime.Now.ToString(), message);
            var json = JsonSerializer.Serialize(LogMessage);
            writer.WriteLine(json);
            writer.Close();
            fs.Close();
            writer = null;
            fs = null;
        }
    }
}
