import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IExamples} from '../../shared/interfaces/example';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityService} from '../shared/services/entity.service';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-update-entity',
  templateUrl: './update-entity.component.html'
})
export class UpdateEntityComponent implements OnInit {
  public form: FormGroup;
  public exampleForm: FormGroup;
  public examples: IExamples = [];
  private examplesNew = [];
  private editedExample;
  private entityId: number;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getEntity();
    this.formsGroup();
  }

  public onSubmit() {
    const {entityName} = this.form.value;
    const examples = [];
    this.examplesNew.forEach((item) => {
      examples.push(item.example);
    });
    const data = {
      entity: {
        id: this.route.snapshot.queryParams.entity,
        examples,
        name: entityName
      }
    };
    if (this.form.valid) {
      this.entityService.updateEntity(this.authService.user.chatbot.id, data).subscribe(() => {
        this.form.reset();
        this.examples = [];
        this.examplesNew = [];
        this.router.navigate(['/entities-page/entities'], {queryParams: {pageNumber: 1}});
      });
    }
  }

  public deleteEntity() {
    this.entityService.deleteEntity(this.authService.user.chatbot.id, this.route.snapshot.queryParams.entity).subscribe(() => {
      this.router.navigate(['/entities-page/entities'], {queryParams: {pageNumber: 1}});
    });
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

  private formsGroup() {
    this.exampleForm = new FormGroup({
      newExample: new FormControl('', [Validators.required])
    });
    this.form = new FormGroup({
      entityName: new FormControl('', [Validators.required])
    });
  }

  private getEntity() {
    this.entityService.getEntityById(this.authService.user.chatbot.id, this.route.snapshot.queryParams.entity).subscribe((data) => {
      this.transformData(data);
      this.form = new FormGroup({
        entityName: new FormControl(data.entities[0].name, [Validators.required])
      });
    });
  }

  private transformData(data) {
    const entity = data.entities[0];
    entity.examples.forEach((item) => {
      if (item) {
        this.examples.push({
          example: item,
          editMode: false
        });
      }
    });
    this.examplesNew = entity.examples;
    this.entityId = entity.id;
  }
}
