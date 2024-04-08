using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Common.EntityDtos
{
    public class PatientDto
    {
        //[Key]
        public int Id { get; set; }
        public string? NameChild { get; set; }
        //public string NameParent { get; set; }
        public string? Address { get; set; } 
        public string? IdChild { get; set; }    
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public string? Password { get; set; }

        public virtual ICollection<CommentDto>? Comments { get; set; }
        public virtual ICollection<AppealDto>? Appeals { get; set; }


    }
}
