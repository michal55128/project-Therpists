using AutoMapper;
using Common.EntityDtos;
using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Interface;
using Repository.Repositories;
using Service.Interfaces;
using Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Repository;


namespace Service
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped(typeof(IService<CategoryDto>), typeof(CategoryService));
            services.AddScoped(typeof(IService<AppealDto>), typeof(AppealService));
            services.AddScoped(typeof(IService<TherpistDto>), typeof(TherpistService));
            services.AddScoped(typeof(IService<PatientDto>), typeof(PatientService));
            services.AddScoped(typeof(IService<CommentDto>), typeof(CommentService));
            services.AddScoped(typeof(IServicesExtention<PatientDto>), typeof(PatientService));
            services.AddScoped(typeof(IServicesExtention<TherpistDto>), typeof(TherpistService));

            services.AddAutoMapper(typeof(MapperProfile));

            return services;
        }
    }
}
