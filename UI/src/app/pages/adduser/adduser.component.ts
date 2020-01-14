import { Component, OnInit, Output } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { GlobalService } from '../../shared/services/global.service'
import { AddUserService } from './service/adduser-service.service';
import { AdduserModel } from './model/adduserModel';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  providers: [ChartsService, GlobalService]
})
export class AddUserComponent implements OnInit {
  showloading: boolean = false;
  public AnimationBarOption;
  pageSize = 10;
  pageNumber = 1;

  UserDetails: AdduserModel[];
  UserDetailsmain: AdduserModel[];
  userDetail = new AdduserModel("", 0, "", "", "0", "", 1);
  methodType: number = 1;
  UserID: number = 0;
  UserDetailsModelArrayIndex: number = 0;
  SearchText: string = "";
  ShowEmpId: boolean = false;
  ShowFname: boolean = false;
  ShowLname: boolean = false;
  ShowRole: boolean = false;
  CreateButtonText: string = "Create User";
  TitleText:string="ADD USER"
  IsValidtosubmit:boolean=true;
  constructor(
    private globalservice: GlobalService,
    private adduserervice: AddUserService
  ) { }

  ngOnInit() {
    this.GetUserDetails();
  }
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  GetUserDetails() {
    this.adduserervice.FetchUserList().subscribe(userlistresp => {
      this.UserDetails = this.UserDetailsmain = userlistresp;
    },
      error => {
        this.globalservice.InactivityLogOut(error);
      })
  }

  CreateOrUpdateUser() {
    if(this.userDetail.username && this.userDetail.role!="0"){
    this.userDetail.MethodType = this.methodType;
    if (this.userDetail.MethodType == 3) {
      this.userDetail.id = this.UserID;
    }
    this.adduserervice.SaveorUpdateUserDetail(this.userDetail).subscribe(userdetailresp => {
      if (this.methodType == 1) {
        //New mode
        this.userDetail.id = <number>userdetailresp;
        this.UserDetails.unshift(this.userDetail);
      }
      else if (this.methodType == 2) {
        this.UserDetails[this.UserDetailsModelArrayIndex] = this.userDetail;
        //Edit Mode
      }
      this.userDetail = new AdduserModel("", 0, "", "", "", "", 1);
      this.ClearGlobalValues();
    },
      error => {
        this.globalservice.InactivityLogOut(error);
      });
    }
    else{
      this.TitleText="Please Fill all the * fields!";
    this.IsValidtosubmit=false;    
    setTimeout(()=>{
      this.TitleText="ADD USER";
      this.IsValidtosubmit=true;
 }, 3000);
    }
  }

  editUser(_userdetail: AdduserModel, _userdetailsArrayIndex: number) {
    this.userDetail = _userdetail;
    this.UserDetailsModelArrayIndex = _userdetailsArrayIndex;
    this.methodType = 2;
    this.CreateButtonText = "Update User";
  }
  SearchClick(searchField: string) {
    switch (searchField) {
      case "EmployeeID":
        this.ShowEmpId = true;
        break;
      case "FirstName":
        this.ShowFname = true;
        break;
      case "LastName":
        this.ShowLname = true;
        break;
      case "Role":
        this.ShowRole = true;
        break;

    }
  }
  Search(newvalue: string, searchField: string) {
    if (newvalue != "") {
      this.UserDetails = this.UserDetailsmain;
      switch (searchField) {
        case "EmployeeID":
          if (newvalue == "0") {
            this.UserDetails = this.UserDetailsmain;
          }
          else {
            this.UserDetails = this.UserDetails.filter(x => x.username.toUpperCase().includes(newvalue.toUpperCase()));
          }
          break;
        case "FirstName":
          if (newvalue == "0") {
            this.UserDetails = this.UserDetailsmain;
          }
          else {
            this.UserDetails = this.UserDetailsmain.filter(x => x.Firstname.toUpperCase().includes(newvalue.toUpperCase()));
          }
          break;
        case "LastName":
          if (newvalue == "0") {
            this.UserDetails = this.UserDetailsmain;
          }
          else {
            this.UserDetails = this.UserDetailsmain.filter(x => x.Lastname.toUpperCase().includes(newvalue.toUpperCase()));
          }
          break;
      }
    }
    else {
      this.UserDetails = this.UserDetailsmain;
    }
  }

  HideSearchBoxes() {
    this.ShowEmpId = true;
    this.ShowFname = false;
    this.ShowLname = false;
    this.ShowRole = false;
  }
  clearUser() {
    this.userDetail = new AdduserModel("", 0, "", "", "", "", 1);
    this.ClearGlobalValues();
    this.GetUserDetails();
  }
  ClearGlobalValues() {
    this.UserID = 0;
    this.UserDetailsModelArrayIndex = 0;
    this.methodType = 1;
    this.CreateButtonText = "Create User";
  }
}
