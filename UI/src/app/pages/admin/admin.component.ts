import { Component, OnInit } from '@angular/core';
import { DownloadDetails } from './Model/DownloadDetails';
import { UserDetails } from './Model/UserDetails';
import { AdminService } from './Service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  pageSize = 10;
  pageNumber = 1;
  userpageSize = 10;
  userpageNumber = 1;
  isUsers:Boolean = true;
  IsTools:Boolean =false;

 
  downloadDetails:DownloadDetails[];
  userDetails:UserDetails[];
  errorMessage:  string;
  status:Boolean;
  constructor(private api:AdminService) {    
  }

  ngOnInit() {
    this.FetchData();
    this.FetchDatauser();
  }
  FetchData():void{

    this.api.GetAdminData().subscribe( 
      DownloadDetails => {   
     this.downloadDetails =DownloadDetails;            
      },   
      error  => this.errorMessage = <any>error 
      );     

      // this.api.GetUsersData().subscribe( 
      //   UserDetails => {   
      //  this.userDetails =UserDetails;            
      //   },   
      //   error  => this.errorMessage = <any>error 
      //   );     
          
  }
  FetchDatauser():void{

      this.api.GetUsersData().subscribe( 
        UserDetails => {   
       this.userDetails =UserDetails;            
        },   
        error  => this.errorMessage = <any>error 
        );  
    }
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  userpageChanged(pN: number): void {
    this.userpageNumber = pN;
  }
  Approve(id:number):void{
    this.api.UpdateApprove(id,1).subscribe(     
      error  => this.errorMessage = <any>error 
      );    
      this.FetchData(); 
  }
  Disapprove(id:number):void{
    this.api.UpdateApprove(id,2).subscribe(     
      error  => this.errorMessage = <any>error 
      );  
      this.FetchData();
  }


  ApproveUser(id:number):void{
    this.api.UpdateUserApproveStatus(id,1).subscribe(     
      error  => this.errorMessage = <any>error 
      );    
      this.FetchData(); 
  }
  DisapproveUser(id:number):void{
    this.api.UpdateUserApproveStatus(id,2).subscribe(     
      error  => this.errorMessage = <any>error 
      );  
      this.FetchData();
  }
}
