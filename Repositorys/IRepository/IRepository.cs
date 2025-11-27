using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FutureStepsAcademy.Repositorys.IRepository
{
    public interface IRepository<T> where T : class
    {
        
        Task<T> Get(Expression<Func<T, bool>> filter);
        Task<IEnumerable<T>> GetAll();
         Task<IEnumerable<T>>  Find(Expression<Func<T, bool>> predicate);
        Task AddAsync(T entity);
        Task Remove(T Entity);
        void RemoveRange(IEnumerable<T> Entity);
        
        

    }
}