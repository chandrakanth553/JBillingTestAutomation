using Core.Helpers.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class JsonHelper : IJsonHelper
    {
        public async Task<string> SerilizeObject<T>(T instance)
        {
            try
            {
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                return JsonConvert.SerializeObject(instance, settings);
            }
            catch (JsonSerializationException jsonSerializationException)
            {
                Console.WriteLine(jsonSerializationException);
                throw;
            }
            catch (Exception e) { }

            return null;
        }

        public async Task<T> DeserilizeObjects<T>(string jsonString)
        {
            T instance = default(T);
            try
            {
                instance = JsonConvert.DeserializeObject<T>(jsonString);
            }
            catch (JsonException jsonException)
            {
                Console.WriteLine(jsonException);
                throw;
            }
            catch (Exception e)
            {

            }

            return instance;
        }
    }
}
