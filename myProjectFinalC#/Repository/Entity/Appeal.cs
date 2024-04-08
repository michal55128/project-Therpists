using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Repository.Entity
{
    public class Appeal
    {
        public int Id { get; set; }
        public string? NamePatient { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int TherpistId { get; set; }

        [ForeignKey("TherpistId")]
        public virtual Therpist Therpist { get; set; }
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]

        public virtual Patient Patient { get; set; }

        public DateTime Date { get; set; }
    }
}
