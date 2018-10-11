using System.Threading.Tasks;

namespace Core.Mapper
{
    public interface IMapper
    {
        Task<D> MapObjects<S, D>(S source, D destination);
    }
}
