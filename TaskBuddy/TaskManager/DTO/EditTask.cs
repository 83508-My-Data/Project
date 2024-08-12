namespace TaskManager.DTO
{
    public class EditTask
    {
        public int Priority { get; set; }
        public int TaskCategoryId { get; set; }
        public int UserId { get; set; }
        public DateTime Deadline { get; set; }
    }
}
