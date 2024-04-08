//using Microsoft.AspNetCore.Mvc;
//using Service.Interfaces;
//using System.Net.Mail;
//using Common.EntityDtos;
//using Common;

//using MimeKit;
//using MailKit.Security;
//using MailKit.Net.Smtp;
//using System.Net;
//using SmtpClient = MailKit.Net.Smtp.SmtpClient;
//using Repository.Entity;
//using System.ComponentModel.DataAnnotations;
//using System.Xml.Linq;
////using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace ChildrenProblems.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AppealControllesr : ControllerBase
//    {
//        private readonly IService<AppealDto> service;
//        public AppealControllesr(IService<AppealDto> service)
//        {
//            this.service = service;
//        }
//        // GET: api/<AppealController>
//        [HttpGet]
//        public async Task<List<AppealDto>> Get()
//        {
//            return await service.GetAll();
//        }

//        // GET api/<AppealController>/5
//        [HttpGet("{id}")]
//        public async Task<AppealDto> Get(int id)
//        {
//            return await service.GetById(id);
//        }

//        // POST api/<AppealController>
//        [HttpPost]
//        //public async Task<ActionResult> Post([FromBody] AppealDto appeal)
//        //{
            
//        //    try
//        //    { 
//        //        return Ok(await service.Add(appeal));

//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return NotFound(ex.Message);
//        //    }

//        //}
//        // POST api/<AppealController>
//        //[HttpPost("sendEmail/{email}")]

//        public async Task PostToSendEmail(string email, [FromBody] string name)
//        {
//            try
//            {
//                await SendEmailToUser(email, name);
//                //return Ok();
//            }
//            catch (Exception ex)
//            {
//                //return NotFound(ex);
//                //return Ok();
//            }
//        }

//        //PUT api/<AppealController>/5
//        [HttpPut("{id}")]
//        public async void Put(int id, [FromBody] AppealDto appeal)
//        {
//            await service.Update(id, appeal);
//        }

//        // DELETE api/<AppealController>/5
//        [HttpDelete("{id}")]
//        public async void Delete(int id)
//        {
//            await service.Delete(id);
//        }


//        private async Task SendEmailToUser(string email, string name)
//        {
//            try
//            {
//                using (var client = new SmtpClient())
//                {
//                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
//                    await client.AuthenticateAsync("yeadim.success@gmail.com", "lukl sjaf isiz bfcm");

//                    var message = new MimeMessage();
//                    message.From.Add(new MailboxAddress("יעדים- הדרך להצלחה!", "yeadim.success@gmail.com"));
//                    message.To.Add(MailboxAddress.Parse(email));
//                    message.Subject = "מחכה לך הודעה באיזור האישי";

//                    var builder = new BodyBuilder();

//                    var htmlContent = System.IO.File.ReadAllText("Html/htmlPageToEmail.html");

//                    builder.HtmlBody = htmlContent;

//                    builder.HtmlBody = htmlContent.Replace("{namePatient}", name);


//                    message.Body = builder.ToMessageBody();

//                    await client.SendAsync(message);
//                    await client.DisconnectAsync(true);
//                }

//                Console.WriteLine("Mail Sent Successfully!");
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Failed to send email: {ex.Message}");

//            }
//        }



//    }
//}
