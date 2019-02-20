using System.ComponentModel.DataAnnotations;

namespace Project1.UserModel
{
    public class Users
    {
        public int Id { get; set; }
        public string Login { get; set; }            
        public string Password { get; set; }
        public string Email { get; set; }
    }
}