using HRB.TR.WEBSERVICE.Models.Request;
using HRB.TR.WEBSERVICE.Models.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HRB.TR.WEBSERVICE.Factory
{
    public class UploadFactory
    {

        public string Upload()
        {
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            string sPath = "C:/";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/locker/");
            string body= System.Web.HttpContext.Current.Request.Form["body"];
            DownloadResponse request = JsonConvert.DeserializeObject<DownloadResponse>(body);

            List<DownloadResponse> memberList = new List<DownloadResponse>();
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/DownloadJsonFile.json");
            //var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\DownloadJsonFile.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);         
            memberList = JsonConvert.DeserializeObject<List<DownloadResponse>>(System.IO.File.ReadAllText(path));
            //request.Id = memberList.Count + 1;
            

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                string fileName = new String(Path.GetFileNameWithoutExtension(hpf.FileName).Take(10).ToArray()).Replace(" ", "-");
                 fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(hpf.FileName);
              
                request.file = fileName;
               
                if (hpf.ContentLength > 0)
                {
                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!File.Exists(sPath + Path.GetFileName(fileName)))
                    {
                        // SAVE THE FILES IN THE FOLDER.
                        hpf.SaveAs(sPath + Path.GetFileName(fileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }
            if (request.Id == 0)
            {
                request.Id = memberList.Count + 1;
                memberList.Add(request);
            }
            else
            {
                var value = memberList.Where(x => x.Id == request.Id).ToList();
                foreach (var prop in value)
                {
                    prop.link = request.link;
                    prop.ToolDescription = request.ToolDescription;
                    prop.ToolName = request.ToolName;
                    prop.file = hfc.Count>0?request.file: prop.file;
                    prop.ContactTo = request.ContactTo;
                }
            }
            File.WriteAllText(path, JsonConvert.SerializeObject(memberList));

            // RETURN A MESSAGE.
            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else
            {
                return "Upload Failed";
            }
        }
        public async Task<bool> PostData(DownloadResponse request)
        {

            List<DownloadResponse> memberList = new List<DownloadResponse>();
            var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\DownloadJsonFile.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            // File.WriteAllText(@"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\registered.json", JsonConvert.SerializeObject(request));

            memberList = JsonConvert.DeserializeObject<List<DownloadResponse>>(System.IO.File.ReadAllText(path));
            request.Id = memberList.Count + 1;
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
