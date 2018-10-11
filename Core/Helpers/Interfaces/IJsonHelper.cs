using System.Threading.Tasks;

namespace Core.Helpers.Interfaces
{
    public interface IJsonHelper
    {
        Task<string> SerilizeObject<T>(T instance);
        Task<T> DeserilizeObjects<T>(string jsonString);
    }
}
