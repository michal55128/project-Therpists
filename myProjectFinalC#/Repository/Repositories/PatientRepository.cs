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
    public class PatientRepository : IRepository<Patient>
    {
        private readonly IContext context;
        public PatientRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Patient> Add(Patient item)
        {

            await this.context.Patients.AddAsync(item);
            await this.context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            this.context.Patients.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task<List<Patient>> GetAll()
        {
            // return await this.context.Patients.ToListAsync();
            // return await this.context.Patients.Include(t=>t.Appeals).ToListAsync();
            return await this.context.Patients.Include(t => t.Appeals).Include(t => t.Comments).ToListAsync();


        }

        public async Task<Patient> GetById(int id)
        {
            // return await this.context.Patients.FirstOrDefaultAsync(x => x.Id == id);
            return await this.context.Patients.Include(t => t.Appeals).Include(t => t.Comments).FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<Patient> Update(int id, Patient item)
        {
            Patient patient = await this.GetById(id);

            if (item.Address != "string") patient.Address = item.Address;
            if (item.NameChild != "string") patient.NameChild = item.NameChild;
            if (item.IdChild != "string") patient.IdChild = item.IdChild;
            if (item.Email != "string") patient.Email = item.Email;
            if (item.Phone != "string") patient.Phone = item.Phone;
            await this.context.save();
            return patient;

        }

    }
}
