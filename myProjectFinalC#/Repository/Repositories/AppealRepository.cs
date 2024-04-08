using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class AppealRepository : IRepository<Appeal>
    {
        private readonly IContext context;
        public AppealRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Appeal> Add(Appeal item)
        {
            await this.context.Appeals.AddAsync(item);
            await this.context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            this.context.Appeals.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task<List<Appeal>> GetAll()
        {

            return await this.context.Appeals.ToListAsync();
        }

        public async Task<Appeal> GetById(int id)
        {
            return await this.context.Appeals.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Appeal> Update(int id, Appeal item)
        {
            Appeal a = await GetById(id);
            if (item.PatientId != 0) a.PatientId = item.PatientId;
            if (item.Date != DateTime.Now) a.Date = item.Date;
            if (item.TherpistId != 0) a.TherpistId = item.TherpistId;
            if (item.Answer != "string") a.Answer = item.Answer;
            if (item.Question != "string") a.Question = item.Question;
            a.NamePatient = item.NamePatient;

            await context.save();
            return a;
        }
    }
}






