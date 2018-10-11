using Core;
using Core.Operations.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using System;

namespace TestProject
{
    public class TestBase
    {
        public IServiceProvider ServiceProvider;
        public TestBase()
        {
            ServiceProvider = BuildDi();
            var loggerFactory = ServiceProvider.GetRequiredService<ILoggerFactory>();
            loggerFactory.AddNLog(new NLogProviderOptions { CaptureMessageTemplates = true, CaptureMessageProperties = true });
            NLog.LogManager.LoadConfiguration("Nlog.config");
            NLog.LogManager.Shutdown();
        }

        public bool createEvent()
        {
            var create = ServiceProvider.GetService<ICreateOpeartion>();
            return create.CreateBillingEvent("").Result;
        }

        private IServiceProvider BuildDi()
        {
            var services = new ServiceCollection();

            services.AddSingleton<ILoggerFactory, LoggerFactory>();
            services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
            services.AddLogging((builder) => builder.SetMinimumLevel(LogLevel.Trace));
            services.AddCoreServicesCollection();
            return services.BuildServiceProvider();
        }
    }
}
