import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IExamples} from '../../../../shared/interfaces/example';
import {IPopupData} from '../../../../shared/interfaces/popup-data';

@Component({
  selector: 'app-add-examples-entities-popup',
  templateUrl: './add-examples-entities-popup.component.html'
})

export class AddExamplesEntitiesPopupComponent implements OnInit {
  public exampleForm: FormGroup;
  public examples: IExamples = [];
  private examplesNew = [];
  private editedExample;

  @Input() popupData: IPopupData;
  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.formGroup();
  }

  public cancel() {
    this.popupData = null;
  }

  public onBtnClick() {
    const examples = [];
    this.examplesNew.forEach((item) => {
      examples.push(item.example);
    });
    this.btnAction.emit(examples);
    this.clearData();
  }

  public onExamleAdd() {
    if (this.exampleForm.valid) {
      this.examples.push(
        {
          example: this.exampleForm.value.newExample,
          editMode: false
        }
      );
      this.examplesNew.push(
        {example: this.exampleForm.value.newExample}
      );
      this.exampleForm.reset();
    }
  }

  public deleteExample(id) {
    this.examples.splice(id, 1);
    this.examplesNew.splice(id, 1);
  }

  public editExample(id) {
    this.examples[id] = {
      example: this.examplesNew[id].example,
      editMode: true
    };
  }

  public onEdit(event) {
    this.editedExample = event.target.textContent;
  }

  public cancelEdit(id) {
    this.examples[id] = {
      example: this.examplesNew[id].example,
      editMode: false
    };
  }

  public saveEdit(id) {
    this.examplesNew[id] = {
      example: this.editedExample
    };
    this.examples[id] = {
      example: this.examplesNew[id].example,
      editMode: false
    };
  }

  private formGroup() {
    this.exampleForm = new FormGroup({
      newExample: new FormControl('', [Validators.required])
    });
  }

  private clearData() {
    this.exampleForm.reset();
    this.examples = [];
    this.examplesNew = [];
  }
}
