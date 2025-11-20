
namespace API.Entities;

public class UserApp
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string DisplayName { get; set; }
    public string Email { get; set; }
}
