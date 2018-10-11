using System.Threading.Tasks;

namespace Core.Helpers.Interfaces
{
    public interface IFileHelper
    {
        Task<string> ReadFromFile(string filePath);
        Task<bool> WriteToFile(string filePath, string messageContent);
    }
}
