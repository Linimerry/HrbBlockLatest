import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DownloadDetails } from '../Model/DownloadDetails';
import { UserDetails } from '../Model/UserDetails';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';


@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient,private AuthGuard:AuthGuardSeviceGuard) 
  { }

  GetAdminData() {
    var url = this.AuthGuard.APIHost +"api/admin/GetAdminData";
    return this.httpClient.get<DownloadDetails[]>(url, {
      headers: new HttpHeaders(this.AuthGuard.GetAuthHeader)
    });   
  }

  GetUsersData() {
    var url = this.AuthGuard.APIHost +"api/admin/GetUsersData";
    return this.httpClient.get<UserDetails[]>(url, {
      headers: new HttpHeaders(this.AuthGuard.GetAuthHeader)
    });   
  }
  

  UpdateApprove(aid:number,statusId:number) {
    
    var body = {
      "id": aid.toString(),
      "statusId": statusId.toString()       
  };
    //var url = "http://localhost:49405/Api/Instructions";
    var url = this.AuthGuard.APIHost + "api/admin/UpdateApprove";
    this.AuthGuard.PostAuthHeader={'Accept': 'text/plain'};
    return this.httpClient.post(url,   body,{
      headers: new HttpHeaders(this.AuthGuard.PostAuthHeader)
    });
}

UpdateUserApproveStatus(aid:number,statusId:number) {
  debugger;
    
  var body = {
    "id": aid.toString(),
    "statusId": statusId.toString()       
};
  var url = this.AuthGuard.APIHost + "api/admin/UpdateUserApproveStatus";
  this.AuthGuard.PostAuthHeader={'Accept': 'text/plain'};
  return this.httpClient.post(url,   body,{
    headers: new HttpHeaders(this.AuthGuard.PostAuthHeader)
  });
}
}
