import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppRoutingModule} from '../app-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReportsPageComponent} from './reports-page.component';
import {ConversationService} from './shared/services/conversation.service';
import {Ng5SliderModule} from 'ng5-slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReportConversationComponent} from './report-conversation/report-conversation.component';
import {ChangeMessageIntentPopupComponent} from './shared/components/change-message-intent-popup/change-message-intent-popup.component';
import {CalendarComponent} from './shared/components/calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SidebarModule,
    AppRoutingModule,
    TranslateModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReportsPageComponent,
    ReportConversationComponent,
    ChangeMessageIntentPopupComponent,
    CalendarComponent
  ],
  providers: [
    ConversationService
  ]
})
export class ReportsModule {}
