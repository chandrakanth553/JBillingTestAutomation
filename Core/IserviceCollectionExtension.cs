using Core.Helpers;
using Core.Helpers.Interfaces;
using Core.Logger;
using Core.Mapper;
using Core.Operations;
using Core.Operations.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Core
{
    public static class IserviceCollectionExtension
    {
        public static IServiceCollection AddCoreServicesCollection(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IAppLogger, AppLogger>();
            serviceCollection.AddTransient<IJsonHelper, JsonHelper>();
            serviceCollection.AddTransient<IMapper, Mapper.Mapper>();
            serviceCollection.AddTransient<ICreateOpeartion, CreateOpeartion>();
            serviceCollection.AddTransient<IFileHelper, FileHelper>();
            return serviceCollection;
        }
    }
}
