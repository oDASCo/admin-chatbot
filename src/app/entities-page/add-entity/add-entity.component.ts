import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EntityService} from '../shared/services/entity.service';
import {IExamples} from '../../shared/interfaces/example';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html'
})
export class AddEntityComponent implements OnInit {
  public form: FormGroup;
  public exampleForm: FormGroup;
  public examples: IExamples = [];
  private examplesNew = [];
  private editedExample;
  public isEntityNameEmpty = false;

  constructor(
    private fb: FormBuilder,
    private entityService: EntityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formGroup();
  }

  public onSubmit() {
    const examples = [];
    this.examplesNew.forEach((item) => {
      if (item) {
        examples.push(item.example);
      }
    });
    const data = {
      entity: {
        name: this.form.value.entityName,
        examples
      }
    };

    if (this.form.value.entityName === '') {
      this.isEntityNameEmpty = true;
    }
    if (this.form.valid) {
      this.entityService.addEntity(this.authService.user.chatbot.id, data).subscribe(() => {
        this.clearData();
      });
    }
  }

  public onAddEntityName() {
    this.isEntityNameEmpty = false;
  }

  public onExampleAdd() {
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

  public onEditExample(event) {
    this.editedExample = event.target.textContent;
  }

  public cancelEditExample(id) {
    this.examples[id] = {
      example: this.examplesNew[id].example,
      editMode: false
    };
  }

  public saveEditExample(id) {
    this.examplesNew[id] = {
      example: this.editedExample
    };
    this.examples[id] = {
      example: this.examplesNew[id].example,
      editMode: false
    };
  }

  private formGroup() {
    this.form = new FormGroup({
      entityName: new FormControl('', [Validators.required])
    });
    this.exampleForm = new FormGroup({
      newExample: new FormControl('', [Validators.required])
    });
  }

  private clearData() {
    this.form.reset();
    this.examples = [];
    this.examplesNew = [];
  }
}
