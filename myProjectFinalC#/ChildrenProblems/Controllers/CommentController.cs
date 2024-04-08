using Common.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenProblems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IService<CommentDto> service;
        public CommentController(IService<CommentDto>service)
        {
            this.service = service;
        }
        // GET: api/<CommentController>
        [HttpGet]
        public async Task<List<CommentDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public async Task< CommentDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<CommentController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CommentDto comment)
        {
            try
            {
                await service.Add(comment);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] CommentDto comment)
        {
           await service.Update(id,comment);
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
          await  service.Delete(id);
        }
    }
}
