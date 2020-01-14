import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadDetails } from './uploadModel';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';
import { DownloadDetails } from '../../download/Model/DownloadDetails';

@Injectable()
export class UploadService {

  constructor(private httpClient: HttpClient,private authGuardSeviceGuard:AuthGuardSeviceGuard) 
    { }

    UploadZipFile(formData: FormData) {
      var url = this.authGuardSeviceGuard.APIHost + "api/upload/UploadDetails";
        
      return this.httpClient.post(url,
        formData, {
          headers: new HttpHeaders(this.authGuardSeviceGuard.PostAuthHeader)
        }
      );
    }
    SaveTool(uploadDetails: UploadDetails,formData: FormData,Xid:string) {

      var body = {     
        "ToolName": uploadDetails.ToolName,
        "ToolDescription": uploadDetails.ToolDescription,
        "link": uploadDetails.link,
        "ContactTo":uploadDetails.ContactTo,
        "file":uploadDetails.file,
        "XID":Xid,
        "Id":uploadDetails.Id,
    };
    formData.append('body', JSON.stringify(body));
      //var url = this.authGuardSeviceGuard.APIHost + "api/upload/PostUpload";
      var url = this.authGuardSeviceGuard.APIHost + "api/upload/UploadDetails";
        
      return this.httpClient.post(url,
        formData, {
          headers: new HttpHeaders(this.authGuardSeviceGuard.PostAuthHeader)
        }
      );

      
    //  this.UploadZipFile(formData);
     // this.authGuardSeviceGuard.PostAuthHeader={'Accept': 'application/json'}
     // return this.httpClient.post(url,
      //  formData, {
       //   headers: new HttpHeaders(this.authGuardSeviceGuard.PostAuthHeader)
       // }
     // );
    } 
    
    GetDownloadDetails() {
      var url = this.authGuardSeviceGuard.APIHost + "/api/download/";   
      return this.httpClient.get<DownloadDetails[]>(url, {
        headers: new HttpHeaders(this.authGuardSeviceGuard.GetAuthHeader)
      });   
    }

}
