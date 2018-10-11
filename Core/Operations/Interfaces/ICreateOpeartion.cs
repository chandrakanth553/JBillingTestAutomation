using System.Threading.Tasks;

namespace Core.Operations.Interfaces
{
    public interface ICreateOpeartion
    {
        Task<bool> CreateBillingEvent(string filename);
    }
}
