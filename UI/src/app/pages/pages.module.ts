import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './Register/register.component';
// import { RegistrationService } from './Register/service/register-service.service';
import { DownloadComponent } from './download/download.component';
import { UploadComponent } from './upload/upload.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { UploadService } from './upload/service/upload.service';
import { DownloadService } from './download/Service/download.service';
import { RegisterService } from './Register/service/register.service';
import { ToolService } from './instructions/Service/tool.service';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/Service/admin.service';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NgxPaginationModule

    ],
    declarations: [
        PagesComponent,
        LoginComponent,
        RegisterComponent ,DownloadComponent,UploadComponent,InstructionsComponent ,AdminComponent      
    ],
    providers: [RegisterService,UploadService,DownloadService,ToolService,AdminService]
})
export class PagesModule { }
