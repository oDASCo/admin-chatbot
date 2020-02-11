import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPipe} from './pipes/filter.pipe';
import {DropdownDirective} from './directives/dropdown.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {ClickOutsideDirective} from './directives/closeOutside.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    FilterPipe,
    DropdownDirective,
    ClickOutsideDirective
  ],
  providers: [],
  exports: [
    FilterPipe,
    DropdownDirective,
    ClickOutsideDirective
  ]
})
export class SharedModule {}
