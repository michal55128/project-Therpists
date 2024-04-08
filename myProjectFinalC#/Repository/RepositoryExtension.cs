using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Interface;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class RepositoryExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<Category>), typeof(CategoryRepository));
            services.AddScoped(typeof(IRepository<Therpist>), typeof(TherpistRepository));
            services.AddScoped(typeof(IRepository<Patient>), typeof(PatientRepository));
            services.AddScoped(typeof(IRepository<Comment>), typeof(CommentRepository));
            services.AddScoped(typeof(IRepository<Appeal>), typeof(AppealRepository));

            return services;
        }
    }
}
