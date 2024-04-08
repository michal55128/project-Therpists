using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDtos
{
    public class CommentDto
    {
        //[Key]
        public int Id { get; set; }
        public string? Description { get; set; }
        public int?  TherpistId { get; set; }
        public int?  PatientId { get; set; }
        public DateTime? Date { get; set; }

        public int NumStars { get; set; }


    }
}
