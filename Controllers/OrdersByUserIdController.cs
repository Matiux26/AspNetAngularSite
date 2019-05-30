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
    public class OrdersByUserIdController : ControllerBase
    {
        private readonly Project1Context _context;

        public OrdersByUserIdController(Project1Context context)
        {
            _context = context;
        }

        // GET: api/OrdersByUserId/5
        [HttpGet("{id}")]
        public async Task<IEnumerable<Orders>> GetOrdersByUserId(int id)
        {
            var orders = await _context.Orders
            .FromSql("SELECT * FROM Orders WHERE user_info_id = {0}", id)
            .ToListAsync();

            return orders;
        }
    }
}
