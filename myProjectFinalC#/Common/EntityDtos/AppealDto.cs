using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDtos
{
    public class AppealDto
    {
        //[Key]
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

        public int TherpistId { get; set; }

        public int PatientId  { get; set; }
        //public int CategoryId  { get; set; }

        public DateTime Date { get; set; }
    }
}
