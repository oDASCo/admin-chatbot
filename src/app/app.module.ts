import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './login/auth.service';
import {SidebarModule} from './sidebar/sidebar.module';
import {EntitiesPageModule} from './entities-page/entities-page.module';
import {IntentsPageModule} from './intents-page/intents-page.module';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './login/login.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ReportsModule} from './reports-page/reports.module';
import {CreateAnAccountModule} from './create-an-account/create-an-account.module';
import {AdminRequestsModule} from './admin-requests/admin-requests.module';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import {MyAccountModule} from './my-account/my-account.module';

@NgModule({
  declarations: [
    AppComponent,
    ActivateEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SidebarModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EntitiesPageModule,
    IntentsPageModule,
    ReportsModule,
    CreateAnAccountModule,
    AdminRequestsModule,
    MyAccountModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule]
})
export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
