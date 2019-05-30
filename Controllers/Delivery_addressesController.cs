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
    public class Delivery_addressesController : ControllerBase
    {
        private readonly Project1Context _context;

        public Delivery_addressesController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/Delivery_addresses
        [HttpGet,Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Delivery_addresses>>> GetDelivery_addresses()
        {
            return await _context.Delivery_addresses.ToListAsync();
        }

        // GET: api/Delivery_addresses/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<Delivery_addresses>> GetDelivery_addresses(int id)
        {
            var delivery_addresses = await _context.Delivery_addresses.FindAsync(id);

            if (delivery_addresses == null)
            {
                return NotFound();
            }

            return delivery_addresses;
        }

        // PUT: api/Delivery_addresses/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutDelivery_addresses(int id, Delivery_addresses delivery_addresses)
        {
            if (id != delivery_addresses.ID)
            {
                return BadRequest();
            }

            _context.Entry(delivery_addresses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Delivery_addressesExists(id))
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

        // POST: api/Delivery_addresses
        [HttpPost, Authorize]
        public async Task<ActionResult<Delivery_addresses>> PostDelivery_addresses(Delivery_addresses delivery_addresses)
        {
            _context.Delivery_addresses.Add(delivery_addresses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDelivery_addresses", new { id = delivery_addresses.ID }, delivery_addresses);
        }

        // DELETE: api/Delivery_addresses/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Delivery_addresses>> DeleteDelivery_addresses(int id)
        {
            var delivery_addresses = await _context.Delivery_addresses.FindAsync(id);
            if (delivery_addresses == null)
            {
                return NotFound();
            }

            _context.Delivery_addresses.Remove(delivery_addresses);
            await _context.SaveChangesAsync();

            return delivery_addresses;
        }

        private bool Delivery_addressesExists(int id)
        {
            return _context.Delivery_addresses.Any(e => e.ID == id);
        }
    }
}
