using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TherpistRepository : IRepository<Therpist>
    {
        private readonly IContext context;
        public TherpistRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Therpist> Add(Therpist item)
        {


            //Therpist ther = item;

            //var existingTherpist = await context.Therpists.FirstOrDefaultAsync(c => c.Email == item.Email);

            //if (existingTherpist != null)
            //{
            //    throw new Exception("כתובת מייל זו כבר קיימת במערכת");
            //}
            await this.context.Therpists.AddAsync(item);
            await this.context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            this.context.Therpists.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task<List<Therpist>> GetAll()
        {

            return await this.context.Therpists.Include(t => t.Categories).Include(t => t.Appeals).Include(t => t.Comments).ToListAsync();



        }

        public async Task<Therpist> GetById(int id)
        {
            return await this.context.Therpists.Include(t => t.Categories).Include(t => t.Appeals).FirstOrDefaultAsync(x => x.Id == id);

        }


        public async Task<Therpist> Update(int id, Therpist item)
        {

            Therpist t = await this.GetById(id);
            if (item.Phone != null) t.Phone = item.Phone;
            if (item.Name != null) t.Name = item.Name;
            if (item.Address != null) t.Address = item.Address;
            if (item.Description != null) t.Description = item.Description;
            if (item.Password != null) t.Password = item.Password;
            if (item.Categories != null) t.Categories = item.Categories;
            if (item.Email != t.Email && item.Email != null) t.Email = item.Email;
            if (item.UrlImage != null) t.UrlImage = item.UrlImage;

            await this.context.save();
            return t;
        }
    }
}
