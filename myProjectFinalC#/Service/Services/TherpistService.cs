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
    public class TherpistService: IServicesExtention<TherpistDto>
    {
        private readonly IRepository<Therpist> repository;
        private readonly IMapper mapper;
        private readonly IRepository<Category> repositoryCategory;

        public TherpistService(IRepository<Therpist> repository, IRepository<Category> repositoryCategory, IMapper mapper)
        {
            this.repository = repository;
            this.repositoryCategory = repositoryCategory;
            this.mapper = mapper;
        }

        public async Task<TherpistDto> Add(TherpistDto entity)
        {
            Therpist T = mapper.Map<Therpist>(entity);

            T.Categories = new HashSet<Category>();
            foreach (var item in entity.CategoriesId)
            {
                var category = await repositoryCategory.GetById(item);
                if (category != null)
                {
                    T.Categories.Add(category);
                }
            }
            // כעת האוובייקט מכיל גם את רשימת הקטגוריות
            return mapper.Map<TherpistDto>(await this.repository.Add(T));
        }



        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task<List<TherpistDto>> GetAll()
        {

            return mapper.Map<List<TherpistDto>>(await this.repository.GetAll());
        }

        public async Task<TherpistDto> GetUserPassword(string password)
        {
            try
            {
                var lst = await this.repository.GetAll();
                foreach (var item in lst)
                {
                    if (item.Password == password)
                    {
                        return mapper.Map<TherpistDto>(item);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
            return null;
        }
        public async Task<TherpistDto> GetById(int id)
        {
            return mapper.Map<TherpistDto>(await this.repository.GetById(id));
        }

        public async Task<TherpistDto> Update(int id, TherpistDto item)
        {
            Therpist t = await repository.GetById(id);
            if (item.CategoriesId != null)
            {
                var category = await repositoryCategory.GetById(item.CategoriesId.First());
                t.Categories.Add(category);
                return mapper.Map<TherpistDto>(await this.repository.Update(id, t));


            }
            else
            {
                return mapper.Map<TherpistDto>(await this.repository.Update(id, mapper.Map<Therpist>(item)));

            }
            //  return mapper.Map<TherpistDto>(await this.repository.Update(id,t));



        }


    }
}
