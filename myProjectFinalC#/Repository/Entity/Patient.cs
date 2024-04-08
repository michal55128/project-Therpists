using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Patient
    {
        public int Id { get; set; }
        public string NameChild { get; set; }
        public string Address { get; set; }
        public string IdChild { get; set; }
        public virtual ICollection<Appeal>? Appeals { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }



    }
}
