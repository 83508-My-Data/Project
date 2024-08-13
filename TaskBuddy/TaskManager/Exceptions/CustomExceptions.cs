namespace TaskManager.Exceptions
{
    public class CustomExceptions : Exception
    {
        public string Msg { get; set; }

        public CustomExceptions( string msg ) {
            this.Msg = msg;
        }
    }
}
