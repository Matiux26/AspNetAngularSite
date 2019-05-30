using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Models
{
    public class Order_items
    {
        public int ID { get; set; }
        [ForeignKey("order_id")]
        public virtual Orders Orders { get; set; }
        public int order_id { get; set; }
        [ForeignKey("product_id")]
        public virtual Products Products { get; set; }
        public int product_id { get; set; }
        public int quantity { get; set; }
    }
}
