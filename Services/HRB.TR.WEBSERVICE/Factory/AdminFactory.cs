using HRB.TR.WEBSERVICE.Email;
using HRB.TR.WEBSERVICE.Models.Request;
using HRB.TR.WEBSERVICE.Models.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace HRB.TR.WEBSERVICE.Factory
{
    public class AdminFactory
    {
        public async Task<List<AdminResponse>> GetData()
        {
            List<AdminResponse> _Details = new List<AdminResponse>();
            // var file = @"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\DownloadJsonFile.json";
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/DownloadJsonFile.json");
           // var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\DownloadJsonFile.json";
            UriBuilder uri = new UriBuilder(codeBase);
            string file = Uri.UnescapeDataString(uri.Path);
            var obj = JsonConvert.DeserializeObject<List<AdminResponse>>(File.ReadAllText(file));

            return obj;
        }
        public async Task<bool> UpdateApprove(string id, string statusId)
        {
            List<AdminResponse> itemList = new List<AdminResponse>();
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/DownloadJsonFile.json");
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            itemList = JsonConvert.DeserializeObject<List<AdminResponse>>(System.IO.File.ReadAllText(path));
           
            foreach (var item in itemList.Where(x => x.Id == Convert.ToInt32(id)))
            {
                    item.IsApproved = Convert.ToInt32(statusId);
                
            }
            File.WriteAllText(path, JsonConvert.SerializeObject(itemList));
            //Email();
            return true;
        }

        public async Task<List<LoginRequest>> GetUsersData()
        {
            List<LoginRequest> _Details = new List<LoginRequest>();
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/registered.json");
            UriBuilder uri = new UriBuilder(codeBase);
            string file = Uri.UnescapeDataString(uri.Path);
            var obj = JsonConvert.DeserializeObject<List<LoginRequest>>(File.ReadAllText(file));
            return obj;
        }
        public async Task<bool> UpdateUserApproveStatus(string id, string statusId)
        {
            List<LoginRequest> itemList = new List<LoginRequest>();
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/registered.json");
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            itemList = JsonConvert.DeserializeObject<List<LoginRequest>>(System.IO.File.ReadAllText(path));
            foreach (var item in itemList.Where(x => x.id == Convert.ToInt32(id)))
            {
                item.IsApproved = Convert.ToInt32(statusId);
            }
            File.WriteAllText(path, JsonConvert.SerializeObject(itemList));
            return true;
        }
        //public async Task<bool> Email()
        //{
        //    string FilePath = @"C:\HRBToolLatest\HRBBlockWorks_ToolDev\Services\HRB.TR.WEBSERVICE\Email\MailTemplate.xml";
        //    StreamReader str = new StreamReader(FilePath);
        //    string MailText = str.ReadToEnd();
        //    str.Close();
        //    EmailNotification obj = new EmailNotification();
        //    //Repalce [newusername] = signup user name   
        //    MailText = MailText.Replace("[report-title]","Registration");
        //    Email.MailMessage msg = new Email.MailMessage();
        //    msg.To="lini.francis@hrblock.com";
        //    msg.Subject = "Registarion";
        //    msg.Body = MailText.ToString();
        //    obj.Publish(msg);
        //    return true;
        //}
    }
}