using HRB.TR.WEBSERVICE.Email;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace HRB.TR.WEBSERVICE.Email
{
    public class EmailNotification
    {
        private XElement _templates;
        public void Publish(MailMessage message)
        {
            if (string.IsNullOrWhiteSpace(message.To))
            {
                throw new Exception("To address is invalid or empty");
            }
            try
            {

                string from_address = System.Configuration.ConfigurationManager.AppSettings["from-address"];
                var msg = new System.Net.Mail.MailMessage(message.From ?? from_address, message.To)
                {
                    Subject = message.Subject ?? "No-subject",
                    IsBodyHtml = true,
                    Body = message.Body.ToString(),
                };
                if (null != message.Cc)
                {
                    msg.CC.Add(message.Cc);
                }
                if (null != message.Bcc)
                {
                    msg.Bcc.Add(message.Bcc);
                }
                if (null != message.Attachment)
                {

                    msg.Attachments.Add(message.Attachment);
                }
                string smtp_server = System.Configuration.ConfigurationManager.AppSettings["smtp-server"];
                using (var client = new SmtpClient(smtp_server))
                {
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = true;
                    client.Send(msg);
                }
                //Services.Logger.Debug("Email publishing finished");
            }
            catch (Exception exception)
            {
                //Services.Logger.Error("Error while publishing email", exception);
            }

        }


    }


    public interface IMailMessage
    {

        /// <summary>
        /// To address
        /// </summary>
        string To { get; set; }

        /// <summary>
        /// Carbon copy addresses
        /// </summary>
        string Cc { get; set; }

        /// <summary>
        /// Blind carbon copy addresses
        /// </summary>
        string Bcc { get; set; }

        /// <summary>
        /// From address
        /// </summary>
        string From { get; set; }

        /// <summary>
        /// Subject
        /// </summary>
        string Subject { get; set; }

        /// <summary>
        /// email body as formatted in 
        /// </summary>
        string Body { get; }

        /// <summary>
        /// Template of email message
        /// </summary>
        string Template { get; }
        System.Net.Mail.Attachment Attachment { get; set; }
        /// <summary>
        /// Get/set token replacements in email template
        /// </summary>
        string this[string key] { get; set; }

    }

}
