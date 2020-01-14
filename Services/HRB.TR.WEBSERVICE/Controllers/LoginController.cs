using HRB.TR.WEBSERVICE.Factory;
using HRB.TR.WEBSERVICE.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace HRB.TR.WEBSERVICE.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> PostData(LoginRequest request)
        {
            LoginFactory loginFactory = new LoginFactory();
           
            var retValue = await loginFactory.PostData(request).ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, retValue);
            return response;
            //Test

        }
    }
}
