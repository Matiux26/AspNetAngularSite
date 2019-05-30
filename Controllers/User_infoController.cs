using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User_infoController : ControllerBase
    {
        private readonly Project1Context _context;

        public User_infoController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/User_info
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<User_info>>> GetUser_info()
        {
            return await _context.User_info.ToListAsync();
        }

        // GET: api/User_info/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<User_info>> GetUser_info(int id)
        {
            var user_info = await _context.User_info.FindAsync(id);

            if (user_info == null)
            {
                return NotFound();
            }

            return user_info;
        }

        // PUT: api/User_info/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutUser_info(int id, User_info user_info)
        {
            if (id != user_info.ID)
            {
                return BadRequest();
            }

            _context.Entry(user_info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_infoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User_info
        [HttpPost, Authorize]
        public async Task<ActionResult<User_info>> PostUser_info(User_info user_info)
        {
            _context.User_info.Add(user_info);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser_info", new { id = user_info.ID }, user_info);
        }

        // DELETE: api/User_info/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<User_info>> DeleteUser_info(int id)
        {
            var user_info = await _context.User_info.FindAsync(id);
            if (user_info == null)
            {
                return NotFound();
            }

            _context.User_info.Remove(user_info);
            await _context.SaveChangesAsync();

            return user_info;
        }

        private bool User_infoExists(int id)
        {
            return _context.User_info.Any(e => e.ID == id);
        }
    }
}
