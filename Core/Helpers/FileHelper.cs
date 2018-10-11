using Core.Helpers.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class FileHelper : IFileHelper
    {
        public async Task<String> ReadFromFile(string filePath)
        {
            try
            {
                using (StreamReader r = new StreamReader(filePath))
                {
                    return r.ReadToEnd();
                }
            }
            catch (Exception e)
            {

            }

            return null;
        }

        public async Task<bool> WriteToFile(string filePath, string messageContent)
        {
            try
            {
                File.WriteAllText(filePath, messageContent);
                return true;
            }
            catch (Exception e)
            {

            }

            return false;
        }
    }
}
