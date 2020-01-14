using HRB.TR.WEBSERVICE.Factory;
using HRB.TR.WEBSERVICE.Models.Response;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace HRB.TR.WEBSERVICE.Controllers
{
    public class DownloadController : ApiController
    {

        [HttpGet]
        public async Task<HttpResponseMessage> GetDownloadData()
        {
            DownloadFactory _downloadFactory = new DownloadFactory();
            var downloadResponse = await _downloadFactory.GetData().ConfigureAwait(false);

            HttpResponseMessage response;
            response = Request.CreateResponse(HttpStatusCode.OK, downloadResponse);
            return response;

        }

        //[HttpPost]
        //public async Task<HttpResponseMessage> DownloadFile()
        //{

        //    //try
        //    //{
        //    //    DownloadFactory _downloadFactory = new DownloadFactory();
        //    //    string fileName = "Appa195255047.pdf";
        //    //    var downloadResponse = await _downloadFactory.DownloadFile(fileName).ConfigureAwait(false);

        //    //    HttpResponseMessage response;
        //    //    response = Request.CreateResponse(HttpStatusCode.OK, downloadResponse);
        //    //    return response;

        //    //}

        //    try
        //    {
        //        var currentDirectory = System.IO.Directory.GetCurrentDirectory();
        //        //  currentDirectory = currentDirectory + "\\src\\assets";
        //        string fileName = "Appa195255047.pdf";
        //        var sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/locker/");
        //        var file = Path.Combine(sPath, fileName);

        //        return Request.CreateResponse(HttpStatusCode.OK,new FileStream(file, FileMode.Open, FileAccess.Read));
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}

        [HttpPost]//http get as it return file
        [Route("api/Download/DownloadFile")]
        public  HttpResponseMessage DownloadFile([FromBody] DownloadResponse request)
        {


            try
            {
                DownloadFactory _downloadfactory = new DownloadFactory();             
                var fStream = _downloadfactory.DownloadFile(request.file);
                HttpResponseMessage response;
                if (fStream == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Gone);
                    return response;

                }
                else
                {
                    response = new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.OK,
                        Content = new StreamContent(fStream)
                    };
                    //set content header of reponse as file attached in reponse
                    response.Content.Headers.ContentDisposition =
                    new ContentDispositionHeaderValue("attachment")
                    {
                        FileName = Path.GetFileName(fStream.Name)
                    };
                    //set the content header content type as application/octet-stream as it returning file as reponse 
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                    return response;

                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
        //below code locate physcial file on server 

        //var sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/locker/");
        //    var localFilePath = Path.Combine(sPath, fileName);
        //    //var localFilePath = HttpContext.Current.Server.MapPath("~/timetable.zip");
        //    HttpResponseMessage response = null;
        //    if (!File.Exists(localFilePath))
        //    {
        //        //if file not found than return response as resource not present 
        //        response = Request.CreateResponse(HttpStatusCode.Gone);
        //    }
        //    else
        //    {
        //        //if file present than read file 
        //        var fStream = new FileStream(localFilePath, FileMode.Open, FileAccess.Read);
        //        //compose response and include file as content in it
        //        response = new HttpResponseMessage
        //        {
        //            StatusCode = HttpStatusCode.OK,
        //            Content = new StreamContent(fStream)
        //        };
        //        //set content header of reponse as file attached in reponse
        //        response.Content.Headers.ContentDisposition =
        //        new ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = Path.GetFileName(fStream.Name)
        //        };
        //        //set the content header content type as application/octet-stream as it returning file as reponse 
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        //    }
        //    return response;
        //}
   // }
}
