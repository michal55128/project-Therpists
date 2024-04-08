using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        public Task<List<T>> GetAll();
        public  Task<T> GetById(int id);
        public Task Delete(int id);
        public Task<T> Update(int id, T entity);
        public Task<T> Add(T item);



    }
}
