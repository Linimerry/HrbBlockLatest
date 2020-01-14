import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DownloadDetails } from '../Model/DownloadDetails';
import { AuthGuardSeviceGuard } from '../../../shared/services/auth-guard.service';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';





@Injectable()
export class DownloadService {
  

  constructor(private httpClient: HttpClient,private AuthGuard:AuthGuardSeviceGuard,private http:Http) 
    { }

    GetDownloadDetails() {
      var url = this.AuthGuard.APIHost + "/api/download/GetDownloadData";   
      return this.httpClient.get<DownloadDetails[]>(url, {
        headers: new HttpHeaders(this.AuthGuard.GetAuthHeader)
      });   
    }

    DownloadFile(filePath: string, fileType:string): Observable<Blob> {

      var body = {
        "file": filePath,
        
    };
      let options = new RequestOptions({responseType: ResponseContentType.Blob });
      var url = this.AuthGuard.APIHost + "/api/download/DownloadFile";  
   
      return this.http.post(url,body, options)
          .map((response: Response) => <Blob>response.blob())  ;
         
  }

    // DownloadFile(filePath: string, fileType:string): Observable<Blob>{
    //   let fileExtension = fileType;
    //   let input = filePath;
    //   var url = this.AuthGuard.APIHost + "/api/download/DownloadFile";  
    //   this.AuthGuard.PostAuthHeader={'Accept': 'application/octet-stream"'} 
      
       


      
    //   //return this.httpClient.post(url+"?fileName="+input, '',
    //   return this.httpClient.post(url, '',
    //   { responseType: 'blob'}
  
    //   )
    //    .map(
    //     (res) => {
    //       console.log(res)
    //           var blob = new Blob([res], {type: fileExtension} )
    //           console.log(blob)
    //           return blob;            
    //     },error=>{ console.log(error)});
    // }


    // { responseType: ResponseContentType.Blob })
    // .map(
    //   (res) => {
    //         var blob = new Blob([res.blob()], {type: fileExtension} )
    //         return blob;            
    //   });
}
