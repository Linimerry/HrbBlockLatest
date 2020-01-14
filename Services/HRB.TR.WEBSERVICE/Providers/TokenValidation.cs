using Newtonsoft.Json;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Security.Claims;
using System.Web.Http.Cors;
using Microsoft.Owin.Security;
using System.Web.Http;
using System.Web.Http.Controllers;
using HRB.TR.WEBSERVICE.Models.Request;
using System.IO;

namespace HRB.TR.WEBSERVICE.Providers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HRBAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {


        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

           // var codeBase = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase) + "\\ResourceFile\\registered.json";
            // From context we get the context.UserName && context.password from this we need to check with Login Json and authorize --- fOR Aravind --- By Raj    
            // var file = @"C:\HRBGTCINDIA\HRB.TR.WEBSERVICE\HRB.TR.WEBSERVICE\ResourceFile\registered.json";
            var codeBase = System.Web.Hosting.HostingEnvironment.MapPath("~/ResourceFile/registered.json");

            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            var obj = JsonConvert.DeserializeObject<List<LoginRequest>>(File.ReadAllText(path));
            var ObjData = obj.Where(x => x.XID == context.UserName && x.password == context.Password).FirstOrDefault();
            if (ObjData != null)
            {
                identity.AddClaim(new Claim("Username", context.UserName));
                identity.AddClaim(new Claim("Name", ObjData.employeeName));
                var props = new AuthenticationProperties(new Dictionary<string, string>
                            {
                                {
                                    "Username",context.UserName
                                },
                    {
                        "Name",ObjData.employeeName
                    }
                            });
                var ticket = new AuthenticationTicket(identity, props);

                context.Validated(ticket);
            }
            else
            {
                context.SetError("invalid_grant", "provided username and password is not matching, please retry.");
                context.Rejected();
            }
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }

    }
    // Use this attribute to every GET and Post methods to autherize the get and post methods--- For ALL--- By Raj
    public class HRBAuthorize : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            bool val = base.IsAuthorized(actionContext);
            return val;
        }
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
        }
    }
}


