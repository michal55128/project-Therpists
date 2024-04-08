using Common.EntityDtos;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Service.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using System.Net;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using System.Xml.Linq;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenProblems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherpistController : ControllerBase
    {
        public readonly IServicesExtention<TherpistDto> service;
        public TherpistController(IServicesExtention<TherpistDto> service)
        {
            this.service = service;
        }
        // GET: api/<TherpistController>
        [HttpGet]
        public async Task<List<TherpistDto>> Get()
        {
            var therpists = await service.GetAll();
            foreach (var t in therpists)
            {
                t.UrlImage = GetImage(t.UrlImage);
            }
            return therpists;
            //return await service.GetAll();
        }

        // GET api/<TherpistController>/5
        [HttpGet("{id}")]
        public async Task<TherpistDto> Get(int id)
        {
            return await service.GetById(id);
        }
        [HttpGet("user/{password}")]
        public async Task<TherpistDto> GetByPassword([Required] string password)
        {
            var therpist = await service.GetUserPassword(password);


            therpist.UrlImage = GetImage(therpist.UrlImage);
          
            return therpist;
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            if (ImageUrl == null) throw new ArgumentNullException(nameof(ImageUrl));
            else
            {
                var path = Path.Combine(Environment.CurrentDirectory + "/Images/", ImageUrl);
                byte[] bytes = System.IO.File.ReadAllBytes(path);
                string imageBase64 = Convert.ToBase64String(bytes);
                string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
                return image;
            }
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] TherpistDto therpistDto)
        {

            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + therpistDto.Image.FileName);

            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                therpistDto.Image.CopyTo(fs);
                fs.Close();
            }
            therpistDto.UrlImage = therpistDto.Image.FileName;
            return Ok(await service.Add(therpistDto));

        }

        [HttpPut("{id}")]
        public async void Put(int id, [FromForm] TherpistDto therpist)
        {
            if (therpist.Image != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + therpist.Image.FileName);
                Console.WriteLine("myPath: " + myPath);

                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    therpist.Image.CopyTo(fs);
                    fs.Close();
                }
                therpist.UrlImage = therpist.Image.FileName;
            }
            await service.Update(id, therpist);
        }                




        // DELETE api/<TherpistController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            await service.Delete(id);
        }



       
    }
}

