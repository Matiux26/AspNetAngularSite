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
    public class Order_itemsController : ControllerBase
    {
        private readonly Project1Context _context;

        public Order_itemsController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/Order_items
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Order_items>>> GetOrder_items()
        {
            return await _context.Order_items.ToListAsync();
        }

        // GET: api/Order_items/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<Order_items>> GetOrder_items(int id)
        {
            var order_items = await _context.Order_items.FindAsync(id);

            if (order_items == null)
            {
                return NotFound();
            }

            return order_items;
        }

        // PUT: api/Order_items/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutOrder_items(int id, Order_items order_items)
        {
            if (id != order_items.ID)
            {
                return BadRequest();
            }

            _context.Entry(order_items).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_itemsExists(id))
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

        // POST: api/Order_items
        [HttpPost, Authorize]
        public async Task<ActionResult<Order_items>> PostOrder_items(Order_items order_items)
        {
            _context.Order_items.Add(order_items);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder_items", new { id = order_items.ID }, order_items);
        }

        // DELETE: api/Order_items/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Order_items>> DeleteOrder_items(int id)
        {
            var order_items = await _context.Order_items.FindAsync(id);
            if (order_items == null)
            {
                return NotFound();
            }

            _context.Order_items.Remove(order_items);
            await _context.SaveChangesAsync();

            return order_items;
        }

        private bool Order_itemsExists(int id)
        {
            return _context.Order_items.Any(e => e.ID == id);
        }
    }
}
