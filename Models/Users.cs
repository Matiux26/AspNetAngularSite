using System.ComponentModel.DataAnnotations;

namespace Project1.UserModel
{
    public class Users
    {
        public int ID { get; set; }
        public string Login { get; set; }            
        public string Password { get; set; }
        public string Email { get; set; }
        //public int user_info_id { get; set; }
        public string Role { get; set; }
    }
}