using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Models
{
    public class OrderSimplified
    {
        public int Id { get; set; }
        public int user_id { get; set; }
        public int product_id { get; set; }
        public string date { get; set; }
        public int quantity { get; set; }
    }
}
