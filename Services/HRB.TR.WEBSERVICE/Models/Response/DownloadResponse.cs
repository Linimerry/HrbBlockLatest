using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HRB.TR.WEBSERVICE.Models.Response
{
    public class DownloadResponse
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ToolDescription { get; set; }
        public string ToolName { get; set; }
        public string ContactTo { get; set; }
        public string link { get; set; }
        public string file { get; set; }
        public string XID { get; set; }
        public int IsApproved { get; set; }
    }
}