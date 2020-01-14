using HRB.TR.WEBSERVICE.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HRB.TR.WEBSERVICE.Controllers
{
    public class InstructionsController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetInstructions()
        {
            Instructions ins = new Instructions();

            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/ToolInstructions.json");
           // var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\ToolInstructions.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);          
            //var file = @"C:\HRBToolLatest\HrbBlockworks\Services\HRB.TR.WEBSERVICE\ResourceFile\ToolInstructions.json";
            var obj = JsonConvert.DeserializeObject<Instructions>(File.ReadAllText(path));
            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, obj);
            return response;
        }
    }
}
