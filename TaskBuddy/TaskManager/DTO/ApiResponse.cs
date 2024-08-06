namespace TaskManager.DTO
{
    public class ApiResponse<T>
    {
        public bool status { get; set; } = false;

        public string Msg { get; set; }

        public T result { get; set; }

    }
}
