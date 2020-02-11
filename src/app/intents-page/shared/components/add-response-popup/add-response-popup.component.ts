import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPopupData} from '../../../../shared/interfaces/popup-data';
import {IResponses} from '../../../../shared/interfaces/response';

@Component({
  selector: 'app-add-response-popup',
  templateUrl: './add-response-popup.component.html'
})
export class AddResponsePopupComponent implements OnInit {
  public responseForm: FormGroup;
  public responses: IResponses = [];
  private responsesNew = [];
  private editedResponse;

  @Input() popupData: IPopupData;
  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.formGroup();
  }

  public cancel() {
    this.popupData = null;
  }

  public onBtnClick() {
    const responses = [];
    this.responsesNew.forEach((item) => {
      responses.push(item.name);
    });
    this.btnAction.emit(responses);
    this.clearData();
  }

  public onResponseAdd() {
    if (this.responseForm.valid) {
      this.responses.push(
        {
          name: this.responseForm.value.newResponse,
          editMode: false
        }
        );
      this.responsesNew.push(
        {name: this.responseForm.value.newResponse}
      );
      this.responseForm.reset();
    }
  }

  public deleteResponse(id) {
    this.responses.splice(id, 1);
    this.responsesNew.splice(id, 1);
  }

  public editResponse(id) {
    this.responses[id] = {
      name: this.responsesNew[id].name,
      editMode: true
    };
  }

  public onEdit(event) {
    this.editedResponse = event.target.textContent;
  }

  public cancelEdit(id) {
    this.responses[id] = {
      name: this.responsesNew[id].name,
      editMode: false
    };
  }

  public saveEdit(id) {
    this.responsesNew[id] = {
      name: this.editedResponse
    };
    this.responses[id] = {
      name: this.responsesNew[id].name,
      editMode: false
    };
  }

  private formGroup() {
    this.responseForm = new FormGroup({
      newResponse: new FormControl('', [Validators.required])
    });
  }

  private clearData() {
    this.responseForm.reset();
    this.responses = [];
    this.responsesNew = [];
  }
}
