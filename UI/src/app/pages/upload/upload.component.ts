import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from './service/upload.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DownloadDetails } from '../download/Model/DownloadDetails';
import { UserDetails } from '../login/Models/UserDetails';
// import { RequestOptions, Headers, Http } from '@angular/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  UploadForm: FormGroup;
  loading = false;
  submitted = false;
  pageSize = 10;
  pageNumber = 1;
  errorMessage:  string;loginsuccess: any;
  CurrentUser: UserDetails = JSON.parse(localStorage.getItem('CurrentUser'));
   formData: FormData = new FormData();
   downloadDetails:DownloadDetails[];
   downloadRowDetails:DownloadDetails;
   @ViewChild('AddToolTab') AddToolInput: ElementRef;
   @ViewChild('ListToolTab') ListToolTab:ElementRef;
  @ViewChild('fileuploade') fileuploade:ElementRef;
  constructor(private uploadservice:UploadService,
      private formBuilder: FormBuilder,
      private router: Router,
      
      // private authenticationService: AuthenticationService,
      // private userService: UserService,
      // private alertService: AlertService
  ) { 
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  urls = [];
    // convenience getter for easy access to form fields
 get f() { return this.UploadForm.controls; }
  ngOnInit() {
    this.UploadForm = this.formBuilder.group({
      ToolName: ['', Validators.required],
      ToolDescription: ['', Validators.required],
      ContactTo: ['', Validators.required],
      link: ['', Validators.required],
      file: [''],
      Id: [0]
    });
    
    this.FetchData();
}


editUser(id:number,_downloadetails: DownloadDetails)
{
 this.AddToolInput.nativeElement.click();
 this.downloadRowDetails = _downloadetails;
  this.UploadForm.setValue({
    ToolDescription: this.downloadRowDetails.ToolDescription,
    link: this.downloadRowDetails.link,
    ToolName: this.downloadRowDetails.ToolName,
    ContactTo: this.downloadRowDetails.ContactTo,
    Id:this.downloadRowDetails.Id,
    file:this.downloadRowDetails.file
  })
  this.fileuploade.nativeElement.file=this.downloadRowDetails.file;
}


  public onSelectFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
   
      this.formData.append('uploadFile', file, file.name);
      this.formData.append('fileType', 'zip');
      // let headers = new Headers();
      // headers.append('Accept', 'application/json');
      // let options = new RequestOptions({ headers: headers });
      // this.httpcli.post('domain/urservice', formData, options)
      //   .map(res => res.json())
      //   .catch(error => Observable.throw(error))
      //   .subscribe(
      //   data => console.log('success'),
      //   error => console.log(error)
      //   )

     // this.uploadservice.UploadZipFile(this.formData).subscribe(x=>{console.log(x);});
    }
    
   
  } 
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  
  FetchData():void{
    this.uploadservice.GetDownloadDetails().subscribe( 
      DownloadDetails => {         
     this.downloadDetails =DownloadDetails.filter(x=>x.XID==this.CurrentUser.UserName);            
      },   
      error  => this.errorMessage = <any>error 
      );         
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.UploadForm.invalid) {
        return;
    }

    this.loading = true;
    this.uploadservice.SaveTool(this.UploadForm.getRawValue(),this.formData,this.CurrentUser.UserName)
     
        .subscribe(
          data => {
            this.FetchData();
            this.ListToolTab.nativeElement.click();
        },
          
          
            // error => {
            //     this.errorMessage=(error);
            //     this.loading = false;
               
            //}
            );


            
}

movelist()
{
  this.ListToolTab.nativeElement.click();
}

}
