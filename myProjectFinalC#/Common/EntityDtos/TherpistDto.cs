using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;



namespace Common.EntityDtos
{
    public class TherpistDto
    {
        //[Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<int>? CategoriesId { get; set; }
        public virtual ICollection<CommentDto>? Comments { get; set; }

        public string? Address { get; set; }
        public string? Description { get; set; }

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }

        public IFormFile? Image { get; set; }
        public string? UrlImage { get; set; }
        public virtual ICollection<AppealDto>? Appeals { get; set; }


    }
}


