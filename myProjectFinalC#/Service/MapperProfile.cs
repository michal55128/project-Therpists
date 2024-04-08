using Common.EntityDtos;
using AutoMapper;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile() {

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Appeal, AppealDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Therpist, TherpistDto>().ReverseMap();
           

        }
    }
}
