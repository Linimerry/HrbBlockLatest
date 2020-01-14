using HRB.TR.WEBSERVICE.Factory;
using HRB.TR.WEBSERVICE.Models.Request;
using HRB.TR.WEBSERVICE.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace HRB.TR.WEBSERVICE.Controllers
{
    public class RegisterController : ApiController
    {
        //[HRBAuthorize]
        [HttpPost]
        public async Task<HttpResponseMessage> PostData([FromBody]LoginRequest request)
        {
            RegisterFactory registerFactory = new RegisterFactory();

            var retValue = await registerFactory.PostData(request).ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, retValue);
            return response;
            //Test

        }
    }
}
