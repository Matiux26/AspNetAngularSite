using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Mail;
using System.Net;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Send_emailController : ControllerBase
    {
        private const string UserName = "HurtowniaSklep";
        private const string Password = "HasloHurt123#";
        private const string Address = "HurtowniaSklep@localhost.com";
        private const string Host = "127.0.0.1";

        [HttpPost]
        public void PostSend_email(String[] email)
        {
            
            SmtpClient client = new SmtpClient(Host);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(UserName, Password);

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(Address);
            mailMessage.To.Add("matiux28@gmail.com");
            mailMessage.Body = email[1];
            mailMessage.Subject = email[2];
            client.Send(mailMessage);
        }
    }
}
