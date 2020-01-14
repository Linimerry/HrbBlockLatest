import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './adduser.component';

const childRoutes: Routes = [
    {
        path: '',
        component: AddUserComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
