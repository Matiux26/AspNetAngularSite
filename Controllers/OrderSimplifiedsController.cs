using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;
using Microsoft.AspNetCore.Authorization;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderSimplifiedsController : ControllerBase
    {
        private readonly Project1Context _context;

        public OrderSimplifiedsController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/OrderSimplifieds
        [HttpGet,Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<OrderSimplified>>> GetOrderSimplified()
        {
            return await _context.OrderSimplified.ToListAsync();
        }

        // GET: api/OrderSimplifieds/5
        [HttpGet("{id}"),Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderSimplified>> GetOrderSimplified(int id)
        {
            var orderSimplified = await _context.OrderSimplified.FindAsync(id);

            if (orderSimplified == null)
            {
                return NotFound();
            }

            return orderSimplified;
        }

        // PUT: api/OrderSimplifieds/5
        [HttpPut("{id}"),Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutOrderSimplified(int id, OrderSimplified orderSimplified)
        {
            if (id != orderSimplified.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderSimplified).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderSimplifiedExists(id))
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

        // POST: api/OrderSimplifieds
        [HttpPost,Authorize]
        public async Task<ActionResult<OrderSimplified>> PostOrderSimplified(OrderSimplified orderSimplified)
        {
            _context.OrderSimplified.Add(orderSimplified);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderSimplified", new { id = orderSimplified.Id }, orderSimplified);
        }

        // DELETE: api/OrderSimplifieds/5
        [HttpDelete("{id}"),Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderSimplified>> DeleteOrderSimplified(int id)
        {
            var orderSimplified = await _context.OrderSimplified.FindAsync(id);
            if (orderSimplified == null)
            {
                return NotFound();
            }

            _context.OrderSimplified.Remove(orderSimplified);
            await _context.SaveChangesAsync();

            return orderSimplified;
        }

        private bool OrderSimplifiedExists(int id)
        {
            return _context.OrderSimplified.Any(e => e.Id == id);
        }
    }
}
