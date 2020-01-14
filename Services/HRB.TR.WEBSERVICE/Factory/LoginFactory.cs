using HRB.TR.WEBSERVICE.Models.Request;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HRB.TR.WEBSERVICE.Factory
{
    public class LoginFactory
    {
        public async Task<bool> PostData(LoginRequest request)
        {
            bool retValue = false;

            var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\registered.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            // File.WriteAllText(@"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\registered.json", JsonConvert.SerializeObject(request));
            

                File.WriteAllText(path, JsonConvert.SerializeObject(request));
                // serialize JSON directly to a file
            using (StreamWriter file = File.CreateText(path))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, request);
                retValue = true;
            }
            return retValue;
        }        
    }
}