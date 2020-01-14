import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MasterModel} from '../models/master-model'
import { Router } from '@angular/router';

import { UserDetails } from '../../pages/login/Models/UserDetails';
import { AuthGuardSeviceGuard } from './auth-guard.service';
/* models */
/* import { TabMenuModel } from '../models/tabs-model';
import { NotificationModel } from '../models/notification-model'; */

@Injectable()
export class GlobalService {
    public CurrentUser:UserDetails = JSON.parse(localStorage.getItem('CurrentUser')) 
    constructor(private httpClient:HttpClient,private router: Router, private authGuardService: AuthGuardSeviceGuard){
    }
    /*private sidebarToggleSource = new Subject<boolean>();
    sidebarToggle$ = this.sidebarToggleSource.asObservable();
    _sidebarToggleState(sidebarToggle: boolean) {
        this.sidebarToggleSource.next(sidebarToggle);
    }*/

    /* private tabsMenuSource = new Subject<TabMenuModel>();
    tabsMenu$ = this.tabsMenuSource.asObservable();
    _tabsMenu(tabsMenu: TabMenuModel) {
        this.tabsMenuSource.next(tabsMenu);
    }
    private tabsOrderSource = new Subject<Array<any>>();
    tabsOrder$ = this.tabsOrderSource.asObservable();
    _tabsOrder(tabsOrder: Array<any>) {
        this.tabsOrderSource.next(tabsOrder);
    }*/
    
    /* private notificationSource = new Subject<NotificationModel>();
    notification$ = this.notificationSource.asObservable();
    _notification(notification: NotificationModel) {
        this.notificationSource.next(notification);
    } */

    /* private isActivedSource = new Subject<any>();
    isActived$ = this.isActivedSource.asObservable();
    _isActived(isActived) {
        this.isActivedSource.next(isActived);
    }*/

    private dataSource = new Subject<DataSourceClass>();

    data$ = this.dataSource.asObservable();
    public Title:string="";
    public dataBusChanged(ev, value) {        
        this.Title=value.title;
        this.dataSource.next({
            ev: ev,
            value: value
        })        
    }    
    public Titlename(){
        return this.Title;
    }

    FetchMasterData(){
        var url = this.authGuardService.APIHost + "api/mastervalue";
         return this.httpClient.get<MasterModel[]>(url, {
            headers: new HttpHeaders(this.authGuardService.GetAuthHeader)
          }); 
       }
    LogOut(){
        var url = this.authGuardService.APIHost + "api/dashboard/logout";
          this.httpClient.get<MasterModel[]>(url, {
            headers: new HttpHeaders(this.authGuardService.GetAuthHeader)
          });
          localStorage.removeItem('CurrentUser');
          this.router.navigate(['']);           
    }
    InactivityLogOut(error:any){      
        if(error.status==401){  
         localStorage.removeItem('CurrentUser');
          this.router.navigate(['']);     
        }      
    }    

}


export class DataSourceClass {
    ev: string;
    value: any
}