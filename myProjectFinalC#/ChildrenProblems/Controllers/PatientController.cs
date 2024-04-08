using Common.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenProblems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public readonly IServicesExtention<PatientDto> service;
        public PatientController(IServicesExtention<PatientDto> service)
        {
            this.service = service;
        }
        // GET: api/<PatientComtroller>
        [HttpGet]
        public async Task<List<PatientDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<PatientComtroller>/5
        [HttpGet("{id}")]
        public async Task<PatientDto> Get(int id)
        {
            return await service.GetById(id);
        }
        [HttpGet("user/{password}")]
        public async Task<PatientDto> GetByPassword([Required] string password)
        {
            return await service.GetUserPassword(password);
        }

        // POST api/<PatientComtroller>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PatientDto patient)
        {
            try
            {
                //await service.Add(patient);
                //return Ok();
                return Ok(await service.Add(patient));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // PUT api/<PatientComtroller>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] PatientDto patient)
        {
           await service.Update(id,patient);
        }

        // DELETE api/<PatientComtroller>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
          await service.Delete(id);
        }
    }
}
