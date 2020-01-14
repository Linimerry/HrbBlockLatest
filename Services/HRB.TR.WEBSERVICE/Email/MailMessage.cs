using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace HRB.TR.WEBSERVICE.Email
{
   
        public class MailMessage : IMailMessage
        {
            #region Properties
    
            public string To { get; set; }
            public string Cc { get; set; }
            public string Bcc { get; set; }
            public string From { get; set; }
            public string Subject { get; set; }
        public string Body
        { get; set; }
        public string Template { get; internal set; }
            private IDictionary<string, string> Tokens { get; set; }
            public System.Net.Mail.Attachment Attachment { get; set; }

    
        public string this[string key]
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        #endregion


    }
  }
