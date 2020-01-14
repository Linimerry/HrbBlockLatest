import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { GlobalService } from './services/global.service';


import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ContentTopComponent } from './layouts/content-top/content-top.component';
import { PagesTopComponent } from './layouts/pages-top/pages-top.component';
import { RightConfigComponent } from './layouts/right-config/right-config.component';
import { AuthGuardSeviceGuard } from './services/auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        TooltipModule.forRoot()
    ],
    providers: [
        GlobalService,
        AuthGuardSeviceGuard
    ],
    declarations: [
        MenuComponent,
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
    
        RightConfigComponent,
        LoadingComponent
    ],
    exports: [
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
      
        RightConfigComponent,
        LoadingComponent
    ]
})
export class LayoutModule { }
