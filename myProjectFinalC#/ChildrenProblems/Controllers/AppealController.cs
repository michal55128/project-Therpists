//using Common.EntityDtos;
//using Microsoft.AspNetCore.Mvc;
//using Service.Interfaces;
//using MimeKit;
//using MailKit.Security;
//using SmtpClient = MailKit.Net.Smtp.SmtpClient;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace ChildrenProblems.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AppealController : ControllerBase
//    {
//        private readonly IService<AppealDto> service;
//        public AppealController(IService<AppealDto> service)
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
//        public async Task<ActionResult> Post([FromBody] AppealDto appeal)
//        {
//            try
//            {
//                //await service.Add(appeal);
//                //return Ok(appeal);
//                return Ok(await service.Add(appeal));
//                //await SendEmailToUser(therpistDto.Email, "45879");
//            }
//            catch (Exception ex)
//            {
//                return NotFound(ex.Message);
//            }
//        }
//        // POST api/<AppealController>
//        [HttpPost(("sendEmile/{email}"))]

//        public async Task<ActionResult> PostTosendEmail([FromBody] string email)
//        {
//            try
//            {
//                return Ok();

//            }
//            catch (Exception ex)
//            {
//                return NotFound(ex.Message);

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


//        private async Task SendEmailToUser(string email, string code)
//        {
//            try
//            {
//                using (var client = new SmtpClient())
//                {
//                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
//                    await client.AuthenticateAsync("yeadim.success@gmail.com", "jbos otar fikk ufiu");

//                    var message = new MimeMessage();
//                    message.From.Add(new MailboxAddress("yeadim", "yeadim.success@gmail.com"));
//                    message.To.Add(MailboxAddress.Parse(email));
//                    message.Subject = "enter the password to yeadim";
//                    message.Body = new TextPart("plain")
//                    {
//                        Text = $"מחכה לך הודעה באיזור האישי משהו מתענין בטיפולים שלך.. לפרטים נוספים היכנס לאיזור האישי בדואר הנכנס.. {code}"
//                    };

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