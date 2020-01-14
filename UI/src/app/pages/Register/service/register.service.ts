import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';
import { FormGroup } from '@angular/forms';

@Injectable(
)
export class RegisterService {
   

  constructor(private httpclient:HttpClient,private AuthGuard:AuthGuardSeviceGuard) {
    
   }

  SaveRegistation( registerForm:any) {

    var body = {
      "employeeName": registerForm.firstName,
      "XID": registerForm.XID,
      "email": registerForm.email,
      "password": registerForm.password
     
  };
    //var url = "http://localhost:49405/Api/Instructions";
    var url = this.AuthGuard.APIHost + "api/Register";
    this.AuthGuard.PostAuthHeader={'Accept': 'application/json'}
    return this.httpclient.post(url, body, {
      headers: new HttpHeaders(this.AuthGuard.PostAuthHeader),      
    });
}
}


 