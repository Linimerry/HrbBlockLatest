import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Instruction } from '../instruction';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';


@Injectable()
export class ToolService {
  
 constructor(private httpClient: HttpClient,private authGuardSeviceGuard:AuthGuardSeviceGuard) 
 { }
//  public GetInstructions(){
//   return this.http.get<Instruction>(`${this.apiURL}/Instuctions`);
// }


GetInstructions() {
  var url = "http://localhost:49405/Api/Instructions";
    
  return this.httpClient.get<Instruction>(url, {
    // headers: new HttpHeaders().set('Content-Type', 'application/json')
  });

  
}    

}
