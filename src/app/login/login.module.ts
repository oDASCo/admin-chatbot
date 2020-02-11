import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {AppRoutingModule} from '../app-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule
  ]
})
export class LoginModule {}
