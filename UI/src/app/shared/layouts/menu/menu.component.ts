import { Component, Input } from '@angular/core';
import { collapse } from '../../animation/collapse-animate';
import { GlobalService } from '../../services/global.service';
import { UserDetails } from '../../../pages/login/Models/UserDetails';

@Component({
  selector: 'du-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [collapse]
})
export class MenuComponent {
  @Input() menuInfo: any;
  @Input() ischildren: boolean=false;
  CurrentUser: UserDetails = JSON.parse(localStorage.getItem('CurrentUser'));
  constructor(private _globalService: GlobalService) { }

  private isToggleOn(item) {
    item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
  }

  private _selectItem(item) {
    //this._globalService._isActived(item);
    this._globalService.dataBusChanged('isActived', item);
  }
  CheckAdminview(title,routerlink){
    if(!routerlink){
    if(title=="Admin" && this.CurrentUser.role!="Admin"){
      return false;
    }
    return true;
  }
  else{
    return false;
  }
  }
}