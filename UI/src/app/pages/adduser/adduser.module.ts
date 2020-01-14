import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './adduser.component';
import { routing } from './adduser.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserService } from './service/adduser-service.service'
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        routing,
        FormsModule, 
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),               
        DatepickerModule.forRoot(),
        ModalModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        AddUserComponent
    ],
    providers:[AddUserService]
})
export class AddUserModule { }
