import { AdduserModel } from '../model/adduserModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';


@Injectable()
export class AddUserService {

  constructor(private httpClient:HttpClient,private authGuardService: AuthGuardSeviceGuard){

  }
  FetchUserList() {
    var url = this.authGuardService.APIHost + "api/dashboard/UserList";
    return this.httpClient.get<AdduserModel[]>(url, {
      headers: new HttpHeaders(this.authGuardService.GetAuthHeader)
    }); // Publish a Server Request
    // this.httpClient.post(url,{});    
  }
  SaveorUpdateUserDetail(userdetail: AdduserModel) {
    var url = this.authGuardService.APIHost + "api/dashboard/Registration";
      
    return this.httpClient.post(url,
      userdetail, {
        headers: new HttpHeaders(this.authGuardService.PostAuthHeader)
      }
    );
  }          
  
}
