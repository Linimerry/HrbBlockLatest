import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegisterService } from './service/register.service';

// import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({templateUrl: 'register.component.html',styleUrls: ['./register.component.scss']})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    errorMessage:  string;;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router, private RegisterService:RegisterService
        // private authenticationService: AuthenticationService,
        // private userService: UserService,
        // private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            XID: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.RegisterService.SaveRegistation(this.registerForm.getRawValue())
         
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                // error => {
                //     this.errorMessage=(error);
                //     this.loading = false;
                   
                //}
                );


                
    }
}
