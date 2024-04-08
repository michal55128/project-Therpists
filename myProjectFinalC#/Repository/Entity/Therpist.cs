using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Therpist
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Description { get; set; }

        public string? Password { get; set; }

        public virtual ICollection<Patient>? Patients { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<Category>? Categories { get; set; }
        public virtual ICollection<Appeal> Appeals { get; set; }

        public string? UrlImage { get; set; }



    }
}
