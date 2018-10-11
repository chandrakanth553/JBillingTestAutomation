using Core.Helpers.Interfaces;
using Core.Models;
using Core.Operations.Interfaces;
using System.Threading.Tasks;

namespace Core.Operations
{
    public class CreateOpeartion : ICreateOpeartion
    {
        private readonly IFileHelper _fileHelper;
        private readonly IJsonHelper _jsonHelper;

        public CreateOpeartion(IFileHelper fileHelper, IJsonHelper jsonHelper)
        {
            _fileHelper = fileHelper;
            _jsonHelper = jsonHelper;
        }

        public async Task<bool> CreateBillingEvent(string filename)
        {
            var message = await _fileHelper.ReadFromFile(filename);
            var bilingEvent = await _jsonHelper.DeserilizeObjects<BillingEventVCompute>(message);
            var messagejson = await _jsonHelper.SerilizeObject(bilingEvent);
            var success = await _fileHelper.WriteToFile("", messagejson);
            return success;
        }
    }
}
