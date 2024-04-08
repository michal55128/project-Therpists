using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string? NameCategory { get; set; }
       public virtual ICollection<TherpistDto>? Therpists { get; set; }

    }
}
