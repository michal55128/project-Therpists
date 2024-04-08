using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mock
{

    public class MockContext : IContext
    {

        //public List<Category> Categories { get ; set ; }
        //public List<Therpist> Therpists { get ; set; }
        //public List<Appeal> Appeals { get; set ; }
        //public List<Comment> Comments { get; set ; }
        //public List<Patient> Patients { get ; set; }





        public DbSet<Category> Categories { get; set; }
        public DbSet<Therpist> Therpists { get; set; }
        public DbSet<Appeal> Appeals { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public MockContext()
        {
        //    this.Categories = new List<Category>();
        //    this.Therpists = new List<Therpist>();
        //    this.Appeals = new List<Appeal>();
        //    this.Comments = new List<Comment>();
        //    this.Patients = new List<Patient>();

            this.Categories.Add(new Category { Id = 1, NameCategory = "mmm" });
            this.Categories.Add(new Category { Id = 2, NameCategory = "ssssss" });
            this.Therpists.Add(new Therpist { Id = 1, Name = "mmm", Address = "jj", Email = "mmmmmmmmmm", Phone = "1233344" });
            this.Therpists.Add(new Therpist { Id = 2, Name = "dddd", Address = "rrrrrrj", Email = "mmmmmmmmmm", Phone = "1233344" });
            this.Appeals.Add(new Appeal { Id = 1, Date = DateTime.Now, Description = "jhhhhhhhhhhhhh" });
            this.Appeals.Add(new Appeal { Id = 2, Date = DateTime.Now, Description = "iooooooooooooo" });
            this.Comments.Add(new Comment { Id = 1, Date = DateTime.Now });
            this.Comments.Add(new Comment { Id = 2, Date = DateTime.Now });
            this.Patients.Add(new Patient { Id = 1, Address = "kkkkkk", Email = "uuuuuuuuu0", IdChild = "22222222222222", NameParent = "jjjjjjj", NameChild = "uuuuu", Phone = "234567890" });
            this.Patients.Add(new Patient { Id = 2, Address = "iiiiiiiiiiiiiii", Email = "oooooooooooo", IdChild = "wwwwwwwwww22222222", NameParent = "ddddddddddddd", NameChild = "dddddddddd", Phone = "98765432" });
         
        }

        //public void save()
        //{
        //    this.save();
        //}

        Task IContext.save()
        {
            throw new NotImplementedException();
        }
    }
}