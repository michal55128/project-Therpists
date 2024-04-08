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
    public class CommentService : IService<CommentDto>
    {

        private readonly IRepository<Comment> repository;
        private readonly IMapper mapper;
        public CommentService(IRepository<Comment> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<CommentDto> Add(CommentDto item)
        {
            return mapper.Map<CommentDto>(await repository.Add(mapper.Map<Comment>(item)));

        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<List<CommentDto>> GetAll()
        {
            return mapper.Map<List<CommentDto>>(await this.repository.GetAll());
        }

        public async Task<CommentDto> GetById(int id)
        {
            return mapper.Map<CommentDto>(await this.repository.GetById(id));
        }

        public async Task<CommentDto> Update(int id, CommentDto item)
        {
            return mapper.Map<CommentDto>(await repository.Update(id, mapper.Map<Comment>(item)));

        }

    }
}
