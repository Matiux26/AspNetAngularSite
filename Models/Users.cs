using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Users
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        [ForeignKey("user_info_id")]
        public virtual User_info User_info { get; set; }
        public int? user_info_id { get; set; }
        public string Role { get; set; }
    }
}