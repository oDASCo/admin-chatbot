import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPopupData} from '../../../../shared/interfaces/popup-data';

@Component({
  selector: 'app-delete-entity-popup',
  templateUrl: './delete-entity-popup.component.html'
})
export class DeleteEntityPopupComponent {
  @Input() popupData: IPopupData;
  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  onBtnClick() {
    this.btnAction.emit();
  }

  cancel() {
    this.popupData = null;
  }
}
