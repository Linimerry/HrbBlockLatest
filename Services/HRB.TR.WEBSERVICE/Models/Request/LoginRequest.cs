using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HRB.TR.WEBSERVICE.Models.Request
{
    public class LoginRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string employeeName { get; set; }        
        public string XID { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public int IsApproved { get; set; }
        public string status { get; set; }
    }
}