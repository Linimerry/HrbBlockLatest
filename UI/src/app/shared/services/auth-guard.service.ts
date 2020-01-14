import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDetails } from '../../pages/login/Models/UserDetails';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardSeviceGuard implements CanActivate {

    // you would usually put this in it's own service and not access it directly!
    // this is just for the sake of the demo.
    isLoggedIn: boolean = false;
    public CurrentUser = new UserDetails("", "", "", "");
    public GetAuthHeader:any={};
    public PostAuthHeader:any={};
    public APIHost="";    

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) { 
        this.getConfigJSON().subscribe(data =>{ 
            console.log(data)
            this.APIHost=data["HostUrl"].toString();
    }, error => console.log(error));       
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'))    
        if (!isNullOrUndefined(this.CurrentUser)) {
            if (!isNullOrUndefined(this.CurrentUser.access_token)) {
                this.GetAuthHeader={'authorization':"bearer " + this.CurrentUser.access_token}
                 this.PostAuthHeader={'Content-Type': 'application/json','authorization':"bearer " + this.CurrentUser.access_token}
                this.PostAuthHeader={'Accept': 'application/json'}
                return true;
            } else {
                this.router.navigate(['']);
                return false;
            }
        } else {
            this.router.navigate(['']);
            return false;
        }
    }

    public getConfigJSON() {
        return this.httpClient.get("./assets/config.json");        
    }
    
    Login(loginForm:any):Observable<any> {
        var url = this.APIHost+"token";
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', loginForm.username)
            .set('password', loginForm.password);
        //var headers= new HttpHeaders({
        // 'Content-Type': 'application/json'          
        // });     
    
        
        return this.httpClient.post(url,
            body.toString(), {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
            
        );
      }
    }