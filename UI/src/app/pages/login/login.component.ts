import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDetails } from './Models/UserDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuardSeviceGuard } from '../../shared/services/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    loginsuccess : object;
    logintext:string;
    IsEmptyOrCorrectCreds:boolean=true;
    CurrentUser= new UserDetails("","","","");
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authguardservice : AuthGuardSeviceGuard
    ) {
        // redirect to home if already logged in
        this.logintext="Sign in to HRB TM"
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;     
        //this.loginsuccess=
        this.authguardservice.Login(this.loginForm.getRawValue()).subscribe(resp=>{  
            this.authguardservice.isLoggedIn = true;
            this.IsEmptyOrCorrectCreds=true;
            this.CurrentUser.access_token=resp["access_token"];
            this.CurrentUser.UserName=resp["Username"];
      
            this.CurrentUser.name=resp["Name"];
           
            localStorage.removeItem('CurrentUser');
            localStorage.setItem('CurrentUser',JSON.stringify(this.CurrentUser));
            this.router.navigate(['/pages']);
          },
          error=>{   
            localStorage.removeItem('CurrentUser');   
            this.authguardservice.isLoggedIn = false;
            this.IsEmptyOrCorrectCreds=false;
            this.logintext="Wrong Credentials!"
            setTimeout(()=>{
              this.logintext="sign in to HRB TM";
              this.IsEmptyOrCorrectCreds=true;
         }, 3000);      
            
          });  
        // this.router.navigate(['/pages']);
       
    }

}
