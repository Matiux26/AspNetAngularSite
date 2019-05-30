using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Models
{
    public class Orders
    {
        public int ID { get; set; }
        public int? user_info_id { get; set; }
        public int? delivery_address_id { get; set; }
        public string payment_type { get; set; }
        public DateTime date { get; set; }
        public string status { get; set; }
        public int total { get; set; }
    }
}
