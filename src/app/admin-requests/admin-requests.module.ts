import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppRoutingModule} from '../app-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {AdminRequestsComponent} from './admin-requests.component';
import {AdminRequestsService} from './admin-requests.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SidebarModule,
    AppRoutingModule,
    TranslateModule
  ],
  declarations: [
    AdminRequestsComponent
  ],
  providers: [
    AdminRequestsService
  ]
})

export class AdminRequestsModule {}
