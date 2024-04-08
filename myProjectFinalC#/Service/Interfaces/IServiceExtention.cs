using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IServicesExtention<T> : IService<T> where T : class
    {
        public Task<T> GetUserPassword(string password);
    }
}
