using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Therpist> Therpists { get; set; }
        public DbSet<Appeal> Appeals { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public Task save();
    }
}
