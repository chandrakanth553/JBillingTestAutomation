using System;
using System.Threading.Tasks;

namespace Core.Logger
{
    public interface IAppLogger
    {
        Task LogError(Exception exception, string label, string message, object instance);
        Task LogWarning(Exception exception, string label, string message, object instance);
        Task LogInfo(string label, string message, object instance);
    }
}
