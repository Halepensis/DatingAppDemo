using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BasicApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberRepository.GetMembersAsync());
        }

        [HttpGet("{id}")] //localhost:5001/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);
            if (member == null) return NotFound();
            return member;
        }


        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdatedDto memberUpdatedDto)
        {
            var memberId = User.GetMemberID();

            var member = await memberRepository.GetMemberForUpdate(memberId);

            if (member == null) return BadRequest("Couldn't get member");

            member.DisplayName = memberUpdatedDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdatedDto.Description ?? member.Description;
            member.City = memberUpdatedDto.City ?? member.City;
            member.Country = memberUpdatedDto.Country ?? member.Country;

            member.User.DisplayName = memberUpdatedDto.DisplayName ?? member.User.DisplayName;

            memberRepository.Update(member); //optional

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");


        }

    }
}
