using AutoMapper;
using Common.EntityDtos;
using MailKit.Security;
using MimeKit;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using MailKit.Net.Smtp;
using System.Net;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using Repository.Entity;
using System.Xml.Linq;
namespace Service.Services
{
    public class AppealService : IService<AppealDto>
    {
        private readonly IRepository<Appeal> repository;
        private readonly IRepository<Therpist> therpist;
        private readonly IRepository<Patient> patient;
        private readonly IMapper mapper;
        public AppealService(IRepository<Appeal> repository, IMapper mapper, IRepository<Therpist> therpist, IRepository<Patient> patient)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.therpist = therpist;
            this.patient = patient;
        }

        public async Task<AppealDto> Add(AppealDto item)
        {
            Therpist therpistValue = await this.therpist.GetById(item.TherpistId);
            Patient patientValue = await this.patient.GetById(item.PatientId);

            await SendEmailToTherpist(therpistValue.Email, patientValue.NameChild, therpistValue.Name);

            return mapper.Map<AppealDto>(await repository.Add(mapper.Map<Appeal>(item)));

        }

        private async Task SendEmailToTherpist(string email, string name, string nameTherpist)
        {
            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("yeadim.success@gmail.com", "lukl sjaf isiz bfcm");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("יעדים- הדרך להצלחה!", "yeadim.success@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "מחכה לך הודעה באיזור האישי";

                    var builder = new BodyBuilder();

                    var htmlContent = System.IO.File.ReadAllText("Html/htmlPageToEmail.html");

                    builder.HtmlBody = htmlContent;

                    htmlContent = htmlContent.Replace("{namePatient}", name);

                    //  builder.HtmlBody = htmlContent.Replace("{namePatient}", name);
                    builder.HtmlBody = htmlContent.Replace("{nameTherpist}", nameTherpist);


                    message.Body = builder.ToMessageBody();

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");

            }
        }
        private async Task SendEmailToPatient(string email, string name, string namePatient)
        {
            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("yeadim.success@gmail.com", "lukl sjaf isiz bfcm");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("יעדים- הדרך להצלחה!", "yeadim.success@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "מחכה לך הודעה באיזור האישי";

                    var builder = new BodyBuilder();

                    var htmlContent = System.IO.File.ReadAllText("Html/htmlPageToPatient.html");

                    builder.HtmlBody = htmlContent;

                    htmlContent = htmlContent.Replace("{nameT}", name);

                    builder.HtmlBody = htmlContent.Replace("{namePatient}", namePatient);


                    message.Body = builder.ToMessageBody();

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");

            }
        }

        public async Task Delete(int id)
        {
            await this.repository.Delete(id);

        }

        public async Task<List<AppealDto>> GetAll()
        {
            List<Appeal> appeals = await this.repository.GetAll();
            return mapper.Map<List<AppealDto>>(appeals);
        }

        public async Task<AppealDto> GetById(int id)
        {
            return mapper.Map<AppealDto>(await this.repository.GetById(id));

        }

        public async Task<AppealDto> Update(int id, AppealDto item)
        {
            Therpist therpistValue = await this.therpist.GetById(item.TherpistId);
            Patient patientValue = await this.patient.GetById(item.PatientId);

            await SendEmailToPatient(patientValue.Email, therpistValue.Name, patientValue.NameChild);

            return mapper.Map<AppealDto>(await repository.Update(id, mapper.Map<Appeal>(item)));

        }

    }
}
