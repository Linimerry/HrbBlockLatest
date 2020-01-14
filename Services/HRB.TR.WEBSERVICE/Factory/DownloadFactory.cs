using HRB.TR.WEBSERVICE.Models.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HRB.TR.WEBSERVICE.Factory
{
    public class DownloadFactory
    {
        public async Task<List<DownloadResponse>> GetData()
        {
            List<DownloadResponse> _Details = new List<DownloadResponse>();
            // var file = @"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\DownloadJsonFile.json";
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/DownloadJsonFile.json");
           // var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\DownloadJsonFile.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string file = Uri.UnescapeDataString(uri.Path);
            var obj = JsonConvert.DeserializeObject<List<DownloadResponse>>(File.ReadAllText(file));
         
            return obj;
        }

        public  FileStream DownloadFile(string fileName)
        {
            var sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/locker/");
            var localFilePath = Path.Combine(sPath, fileName);
            //var localFilePath = HttpContext.Current.Server.MapPath("~/timetable.zip");
            //HttpResponseMessage response = null;
            if (!File.Exists(localFilePath))
            {
                //if file not found than return response as resource not present 
                return null;
            }
            else
            {
                //if file present than read file 
                var fStream = new FileStream(localFilePath, FileMode.Open, FileAccess.Read);
                return fStream;
                //compose response and include file as content in it
            }
        
       }
    }
}