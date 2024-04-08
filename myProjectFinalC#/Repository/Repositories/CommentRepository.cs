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
    public class CommentRepository : IRepository<Comment>
    {
        private readonly IContext context;
        public CommentRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Comment> Add(Comment item)
        {
            await this.context.Comments.AddAsync(item);
            await this.context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            this.context.Comments.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task<List<Comment>> GetAll()
        {
            return await this.context.Comments.ToListAsync();
        }

        public async Task<Comment> GetById(int id)
        {

            return await this.context.Comments.FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<Comment> Update(int id, Comment item)
        {
            Comment c = await GetById(id);
            if (item.TherpistId != 0) c.TherpistId = item.TherpistId;
            if (item.PatientId != 0) c.PatientId = item.PatientId;
            if (item.Description != "string") c.Description = item.Description;
            if (item.Date != null) c.Date = item.Date;
            await this.context.save();
            return c;


        }

    }
}
