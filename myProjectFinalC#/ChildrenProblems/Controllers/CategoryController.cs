using Common.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenProblems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDto> service;
        public CategoryController(IService<CategoryDto> service)
        {
            this.service = service;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {
            //return await service.GetAll();
            var category= await service.GetAll();
            foreach (var item in category) {
                foreach (var item1 in item.Therpists)
                {
                    item1.UrlImage = GetImage(item1.UrlImage);
                }
            }

            return category;

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
        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task< CategoryDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] CategoryDto categoryDto)
        {
            try
            {
            //    await service.Add(categoryDto);
            //    return Ok(categoryDto);
                return Ok(await service.Add(categoryDto));
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromForm] CategoryDto categoryDto)
        {
          await  service.Update(id, categoryDto);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
           await service.Delete(id);
        }
    }
}
