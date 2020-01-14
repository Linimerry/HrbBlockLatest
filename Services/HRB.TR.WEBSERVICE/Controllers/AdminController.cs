using HRB.TR.WEBSERVICE.Factory;
using HRB.TR.WEBSERVICE.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace HRB.TR.WEBSERVICE.Controllers
{
    public class AdminController : ApiController
    {

        [HttpGet]
      
        [Route("api/Admin/GetAdminData")]
        public async Task<HttpResponseMessage> GetAdminData()
        {
            AdminFactory _adminFactory = new AdminFactory();
            var adminResponse = await _adminFactory.GetData().ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, adminResponse);
            return response;
        }

        //  [ActionName("UpdateApprove")]
        //public async Task<HttpResponseMessage> PostData([FromBody]string id,string statusId)
        [HttpPost]
        [Route("api/Admin/UpdateApprove")]
      
        public async Task<HttpResponseMessage> UpdateApprove([FromBody]UpdateApproveRequest updateApprove)
        {
            AdminFactory _adminFactory = new AdminFactory();
            var adminResponse = await _adminFactory.UpdateApprove(updateApprove.id, updateApprove.statusId).ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, adminResponse);
            return response;
        }

        [HttpGet]
        [Route("api/Admin/GetUsersData")]
      
        public async Task<HttpResponseMessage> GetUsersData()
        {
            AdminFactory _adminFactory = new AdminFactory();
            var adminResponse = await _adminFactory.GetUsersData().ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, adminResponse);
            return response;
        }

    
        [HttpPost]
        [Route("api/Admin/UpdateUserApproveStatus")]
      
        public async Task<HttpResponseMessage> UpdateUserApproveStatus([FromBody]UpdateApproveRequest updateApprove)
        {
            AdminFactory _adminFactory = new AdminFactory();
            var adminResponse = await _adminFactory.UpdateUserApproveStatus(updateApprove.id, updateApprove.statusId).ConfigureAwait(false);
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, adminResponse);
            return response;
        }

        public class UpdateApproveRequest
        {
            public string id;
            public string statusId;
        }
    }
}
