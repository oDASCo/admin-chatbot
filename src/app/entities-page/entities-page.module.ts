import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EntitiesPageComponent} from './entities-page.component';
import {SharedModule} from '../shared/shared.module';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppRoutingModule} from '../app-routing.module';
import {EntityService} from './shared/services/entity.service';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { EntitiesComponent } from './entities/entities.component';
import { DeleteEntityPopupComponent } from './shared/components/delete-entity-popup/delete-entity-popup.component';
import { AddExamplesEntitiesPopupComponent } from './shared/components/add-examples-entities-popup/add-examples-entities-popup.component';
import { UpdateEntityComponent } from './update-entity/update-entity.component';
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
    EntitiesPageComponent,
    AddEntityComponent,
    EntitiesComponent,
    DeleteEntityPopupComponent,
    AddExamplesEntitiesPopupComponent,
    UpdateEntityComponent
  ],
  providers: [
    EntityService
  ]
})

export class EntitiesPageModule {}
