using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TestProject
{
    [TestClass]
    public class Tests : TestBase
    {
        [TestMethod]
        public void TestMethod1()
        {
            var success = createEvent();
            Assert.IsTrue(success);
        }
    }
}
