﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Models
{
    public class Orders
    {
        public int ID { get; set; }
        [ForeignKey("user_info_id")]
        public virtual User_info User_info { get; set; }
        public int? user_info_id { get; set; }
        [ForeignKey("delivery_address_id")]
        public virtual Delivery_addresses Delivery_addresses { get; set; }
        public int? delivery_address_id { get; set; }
        public string payment_type { get; set; }
        public string date { get; set; }
        public string status { get; set; }
        public int total { get; set; }
    }
}
