using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {

        private readonly IContext context;
        public CategoryRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Category> Add(Category item)
        {
            await this.context.Categories.AddAsync(item);
            await this.context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            this.context.Categories.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task<List<Category>> GetAll()
        {
            return await context.Categories.Include(c => c.Therpists).ToListAsync();

        }

        public async Task<Category> GetById(int id)
        {
            return await this.context.Categories.Include(t => t.Therpists).FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<Category> Update(int id, Category item)
        {
            Category c = await GetById(id);
            if (item.NameCategory != "string") c.NameCategory = item.NameCategory;
            if (item.Therpists != null) c.Therpists = item.Therpists;
            await context.save();
            return c;
        }

    }
}
