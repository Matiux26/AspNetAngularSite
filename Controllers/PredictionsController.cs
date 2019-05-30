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
    public class PredictionsController : ControllerBase
    {
        private readonly Project1Context _context;

        public PredictionsController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/Predictions
        [HttpGet,Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Predictions>>> GetPredictions()
        {
            return await _context.Predictions.ToListAsync();
        }

        // GET: api/Predictions/5
        [HttpGet("{id}"),Authorize(Roles = "admin")]
        public async Task<ActionResult<Predictions>> GetPredictions(int id)
        {
            var predictions = await _context.Predictions.FindAsync(id);

            if (predictions == null)
            {
                return NotFound();
            }

            return predictions;
        }

        // PUT: api/Predictions/5
        [HttpPut("{id}"),Authorize(Roles = "admin")]
        public async Task<IActionResult> PutPredictions(int id, Predictions predictions)
        {
            if (id != predictions.Id)
            {
                return BadRequest();
            }

            _context.Entry(predictions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PredictionsExists(id))
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

        // POST: api/Predictions
        [HttpPost,Authorize(Roles = "admin")]
        public async Task<ActionResult<Predictions>> PostPredictions(Predictions predictions)
        {
            _context.Predictions.Add(predictions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPredictions", new { id = predictions.Id }, predictions);
        }

        // DELETE: api/Predictions/5
        [HttpDelete("{id}"),Authorize(Roles = "admin")]
        public async Task<ActionResult<Predictions>> DeletePredictions(int id)
        {
            var predictions = await _context.Predictions.FindAsync(id);
            if (predictions == null)
            {
                return NotFound();
            }

            _context.Predictions.Remove(predictions);
            await _context.SaveChangesAsync();

            return predictions;
        }

        private bool PredictionsExists(int id)
        {
            return _context.Predictions.Any(e => e.Id == id);
        }
    }
}
