using System.Text.Json.Serialization;

namespace TaskManagement.Api.Models;

public class TaskItem
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TaskItemStatus Status { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PriorityStatus Priority { get; set; }
    public int AssigneeId { get; set; }
    public int CreatorId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public User? Assignee { get; set; }
}
