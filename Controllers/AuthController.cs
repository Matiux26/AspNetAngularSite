using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Project1Context _context;

        public AuthController(Project1Context context)
        {
            _context = context;
        }

        // POST api/login
        [HttpPost, Route("login")]
        public async Task<ActionResult<UserModel.Users>> Login(UserModel.Users user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            if (CheckUserCredentials(user) == true)
            {
                var secretKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
        public Boolean CheckUserCredentials(UserModel.Users user)
        {
            var userExists = (from listUsers in _context.Users
                             where listUsers.Login == user.Login || 
                             listUsers.Password == user.Password
                             select listUsers).Any();
            return userExists;
        }
    }
}