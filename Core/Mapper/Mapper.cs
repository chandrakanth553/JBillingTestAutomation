using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Core.Mapper
{
    public class Mapper : IMapper
    {
        public async Task<D> MapObjects<S, D>(S source, D destination)
        {
            Dictionary<string, string> myDict = new Dictionary<string, string>();
            Type t = source.GetType();
            foreach (PropertyInfo pi in t.GetProperties())
            {
                myDict[pi.Name] = pi?.GetValue(source, null)?.ToString();
            }
            foreach (var keyValuePair in myDict)
            {
                if (keyValuePair.Value != null)
                {
                    var s = destination.GetType().GetProperty(keyValuePair.Key);
                    s.SetValue(destination, Convert.ChangeType(keyValuePair.Value, s.PropertyType), null);

                }
            }

            return destination;
        }
    }
}
