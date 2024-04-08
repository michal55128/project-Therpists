using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int TherpistId { get; set; }
        [ForeignKey("TherpistId")]
        public virtual Therpist Therpist { get; set; }
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        public DateTime Date { get; set; }
        public string? NamePatient { get; set; }

        public int NumStars { get; set; }


    }
}
