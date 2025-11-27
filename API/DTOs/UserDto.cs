using System;

namespace API.DTOs;

public class UserDto
{
    public required String Id { get; set; }
    public required String Email { get; set; }
    public required String DisplayName { get; set; }

    public required String Token { get; set; }
    public String? ImageUrl { get; set; }

}
