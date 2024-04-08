using Microsoft.EntityFrameworkCore;
using Repository.Interface;
using Repository.Entity;
using AutoMapper;

namespace DataContext
{
    public class Db : DbContext, IContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Therpist> Therpists { get; set; }
        public DbSet<Appeal> Appeals { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Patient> Patients { get; set; }


        public async Task save()
        {
           await SaveChangesAsync();
        }
        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    builder.Entity<Therpist>()
        //        .HasIndex(u => u.Email)
        //        .IsUnique();
        //}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=myTherapistsDB;Trusted_Connection=True;");
            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=model;Integrated Security=True");
            //iFromFile

        }

    }
}