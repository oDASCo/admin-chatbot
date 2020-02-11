import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IntentsPageComponent} from './intents-page.component';
import {SharedModule} from '../shared/shared.module';
import {IntentsComponent} from './intents/intents.component';
import {AddIntentComponent} from './add-intent/add-intent.component';
import {IntentService} from './shared/services/intent.service';
import {FallbacksComponent} from './fallbacks/fallbacks.component';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppRoutingModule} from '../app-routing.module';
import {DeleteIntenetPopupComponent} from './shared/components/delete-intenet-popup/delete-intenet-popup.component';
import {UpdateIntentComponent} from './update-intent/update-intent.component';
import {AddResponsePopupComponent} from './shared/components/add-response-popup/add-response-popup.component';
import {AddExamplesPopupComponent} from './shared/components/add-examples-popup/add-examples-popup.component';
import {TranslateModule} from '@ngx-translate/core';

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
    IntentsPageComponent,
    IntentsComponent,
    AddIntentComponent,
    FallbacksComponent,
    DeleteIntenetPopupComponent,
    UpdateIntentComponent,
    AddResponsePopupComponent,
    AddExamplesPopupComponent
  ],
  providers: [
    IntentService
  ]
})
export class IntentsPageModule {}
