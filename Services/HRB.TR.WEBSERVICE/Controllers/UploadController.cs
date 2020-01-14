using HRB.TR.WEBSERVICE.Factory;
using HRB.TR.WEBSERVICE.Models.Response;
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
    public class UploadController : ApiController
    {
        [HttpPost]
        [ActionName("UploadDetails")]
        public HttpResponseMessage UploadData()
        {
            UploadFactory _downloadFactory = new UploadFactory();
            var _response = _downloadFactory.Upload();
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, _response);
            return response;
        }


        [HttpPost]
        [Route("api/Upload/PostUpload")]
        public async Task<HttpResponseMessage> PostUpload([FromBody]DownloadResponse request)
        {
            UploadFactory uploadFactory = new UploadFactory();

            var retValue = await uploadFactory.PostData(request).ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, retValue);
            return response;

        }
    }
}
