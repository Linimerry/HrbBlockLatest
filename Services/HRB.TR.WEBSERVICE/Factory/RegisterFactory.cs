using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using HRB.TR.WEBSERVICE.Models.Request;

namespace HRB.TR.WEBSERVICE.Factory
{
    public class RegisterFactory
    {
        public async Task<bool> PostData(LoginRequest request)
        {
            bool retValue = false;
             List<LoginRequest> memberList = new List<LoginRequest>();
            //var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\registered.json";
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/registered.json");
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            // File.WriteAllText(@"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\registered.json", JsonConvert.SerializeObject(request));

            memberList = JsonConvert.DeserializeObject<List<LoginRequest>>(System.IO.File.ReadAllText(path));
            request.id = memberList.Count + 1;
            memberList.Add(request);
            File.WriteAllText(path, JsonConvert.SerializeObject(memberList));
            // serialize JSON directly to a file
            //using (StreamWriter file = File.CreateText(path))
            //{
            //    JsonSerializer serializer = new JsonSerializer();
            //    serializer.Serialize(file, request);
            //    retValue = true;
            //}
            return true;
        }
    }
}