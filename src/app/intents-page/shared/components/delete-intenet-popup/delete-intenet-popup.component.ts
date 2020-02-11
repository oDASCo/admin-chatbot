import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPopupData} from '../../../../shared/interfaces/popup-data';

@Component({
  selector: 'app-delete-intenet-popup',
  templateUrl: './delete-intenet-popup.component.html'
})
export class DeleteIntenetPopupComponent {
  @Input() popupData: IPopupData;
  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  public onBtnClick() {
    this.btnAction.emit();
  }

  public cancel() {
    this.popupData = null;
  }
}
