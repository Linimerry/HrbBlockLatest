using System.Net.Http;

namespace HRB.TR.WEBSERVICE.Validation
{
    internal class BadRequestObjectResult : HttpResponseMessage
    {
        private object modelState;

        public BadRequestObjectResult(object modelState)
        {
            this.modelState = modelState;
        }
    }
}