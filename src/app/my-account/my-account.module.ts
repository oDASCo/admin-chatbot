import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppRoutingModule} from '../app-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {MyAccountComponent} from './my-account.component';


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
    MyAccountComponent
  ]
})

export class MyAccountModule {}
