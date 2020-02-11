import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EntitiesPageComponent} from './entities-page/entities-page.component';
import {IntentsPageComponent} from './intents-page/intents-page.component';
import {IntentsComponent} from './intents-page/intents/intents.component';
import {FallbacksComponent} from './intents-page/fallbacks/fallbacks.component';
import {AddIntentComponent} from './intents-page/add-intent/add-intent.component';
import {UpdateIntentComponent} from './intents-page/update-intent/update-intent.component';
import {AuthGuard} from './login/auth.guard';
import {AddEntityComponent} from './entities-page/add-entity/add-entity.component';
import {EntitiesComponent} from './entities-page/entities/entities.component';
import {UpdateEntityComponent} from './entities-page/update-entity/update-entity.component';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {ReportConversationComponent} from './reports-page/report-conversation/report-conversation.component';
import {CreateAnAccountComponent} from './create-an-account/create-an-account.component';
import {AdminRequestsComponent} from './admin-requests/admin-requests.component';
import {ActivateEmailComponent} from './activate-email/activate-email.component';
import {MyAccountComponent} from './my-account/my-account.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'entities-page', canActivate: [AuthGuard], component: EntitiesPageComponent, children: [
      {path: 'entities', component: EntitiesComponent},
      {path: 'add-entity', component: AddEntityComponent},
      {path: 'update-entity', component: UpdateEntityComponent}
    ]
  },
  {
    path: 'intents-page', canActivate: [AuthGuard], component: IntentsPageComponent,
    children: [
      {path: 'intents', component: IntentsComponent},
      {path: 'fallbacks', component: FallbacksComponent},
      {path: 'add-intent', component: AddIntentComponent},
      {path: 'update-intent', component: UpdateIntentComponent}
    ]
  },
  {
    path: 'reports-page', canActivate: [AuthGuard], component: ReportsPageComponent, children: [
      {path: ':id', component: ReportConversationComponent}
    ]
  },
  {
    path: 'create-an-account', component: CreateAnAccountComponent
  },
  {
    path: 'admin-requests', canActivate: [AuthGuard], component: AdminRequestsComponent
  },
  {
    path: 'my-account', canActivate: [AuthGuard], component: MyAccountComponent
  },
  {
    path: 'activation', component: ActivateEmailComponent, children: [
      {path: ':id', component: ActivateEmailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
