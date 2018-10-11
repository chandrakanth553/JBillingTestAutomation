using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Core.Logger
{
    public class AppLogger : IAppLogger
    {
        private readonly ILogger<AppLogger> _logger;
        public Guid id => new Guid();
        public AppLogger(ILogger<AppLogger> logger)
        {
            _logger = logger;
        }
        public async Task LogError(Exception exception, string label, string message, object instance)
        {
            _logger.LogError(exception, message, instance, label, id);
        }
        public async Task LogWarning(Exception exception, string label, string message, object instance)
        {
            _logger.LogWarning(exception, message, instance, label, id);
        }

        public async Task LogInfo(string label, string message, object instance)
        {
            _logger.LogInformation(message, instance, label, id);
        }
    }
}
