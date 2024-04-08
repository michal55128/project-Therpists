using AutoMapper;
using Common.EntityDtos;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CategoryService : IService<CategoryDto>
    {
        private readonly IRepository<Category> repository;
        private readonly IMapper mapper;
        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<CategoryDto> Add(CategoryDto item)
        {
            return mapper.Map<CategoryDto>(await repository.Add(mapper.Map<Category>(item)));

        }
        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<List<CategoryDto>> GetAll()
        {
            return mapper.Map<List<CategoryDto>>(await this.repository.GetAll());
        }

        public async Task<CategoryDto> GetById(int id)
        {
            return mapper.Map<CategoryDto>(await this.repository.GetById(id));
        }

        public async Task<CategoryDto> Update(int id, CategoryDto item)
        {
            return mapper.Map<CategoryDto>(await this.repository.Update(id, mapper.Map<Category>(item)));
        }

    }
}
