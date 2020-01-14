import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import {  AuthGuardSeviceGuard } from '../shared/services/auth-guard.service';
import { RegisterComponent } from './Register/register.component';
import { DownloadComponent } from './download/download.component';
import { UploadComponent } from './upload/upload.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { AdminComponent } from './admin/admin.component';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
    children: [
    { path:'download', component:DownloadComponent, canActivate: [AuthGuardSeviceGuard] },
    {path:'upload',component:UploadComponent,canActivate:[AuthGuardSeviceGuard]},
    {path:'register',component:RegisterComponent },
    {path:'instruction',component:InstructionsComponent} ,
    {path:'admin',component:AdminComponent}      
             ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
