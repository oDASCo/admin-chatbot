import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IntentService} from '../shared/services/intent.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IExamples} from '../../shared/interfaces/example';
import {IResponses} from '../../shared/interfaces/response';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-update-intent',
  templateUrl: './update-intent.component.html'
})
export class UpdateIntentComponent implements OnInit {
  public form: FormGroup;
  public exampleForm: FormGroup;
  public responseForm: FormGroup;
  public examples: IExamples = [];
  public responses: IResponses = [];
  private examplesNew = [];
  private editedExample;
  private responsesNew = [];
  private editedResponse;
  private intentId: number;

  constructor(
    private route: ActivatedRoute,
    private intentService: IntentService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getIntent();
    this.formsGroup();
  }

  public onSubmit() {
    const {intentName} = this.form.value;
    const data = {
      intent: {
        examples: this.examplesNew,
        name: intentName,
        responses: this.responsesNew,
        id: this.route.snapshot.queryParams.intent
      }
    };
    if (this.form.valid) {
      this.intentService.updateIntent(this.authService.user.chatbot.id, data).subscribe(() => {
        this.clearData();
        this.router.navigate(['/intents-page/intents'], {queryParams: {pageNumber: 1}});
      });
    }
  }

  public deleteIntent() {
    this.intentService.deleteIntent(this.authService.user.chatbot.id, this.route.snapshot.queryParams.intent).subscribe(() => {
      this.router.navigate(['/intents-page/intents'], {queryParams: {pageNumber: 1}});
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

  public onResponseAdd() {
    if (this.responseForm.valid) {
      this.responses.push(
        {
          name: this.responseForm.value.newResponse,
          editMode: false
        }
      );
      this.responsesNew.push(
        this.responseForm.value.newResponse
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

  public onEditResponse(event) {
    this.editedResponse = event.target.textContent;
  }

  public cancelEditResponse(id) {
    this.responses[id] = {
      name: this.responsesNew[id].name,
      editMode: false
    };
  }

  public saveEditResponse(id) {
    this.responsesNew[id] = {
      name: this.editedResponse
    };
    this.responses[id] = {
      name: this.responsesNew[id].name,
      editMode: false
    };
  }

  private formsGroup() {
    this.exampleForm = new FormGroup({
      newExample: new FormControl('', [Validators.required])
    });
    this.responseForm = new FormGroup({
      newResponse: new FormControl('', [Validators.required])
    });
    this.form = new FormGroup({
      intentName: new FormControl('', [Validators.required])
    });
  }

  private getIntent() {
    this.intentService.getIntentByName(this.authService.user.chatbot.id, this.route.snapshot.queryParams.intent).subscribe((data) => {
      this.transformData(data);
      this.formGroupIntentName(data);
    });
  }

  private formGroupIntentName(data) {
    this.form = new FormGroup({
      intentName: new FormControl(data.intents[0].name, [Validators.required])
    });
  }

  private transformData(data) {
    console.log(data);
    const intents = data.intents[0];
    intents.examples.forEach((item) => {
      if (item) {
        this.examples.push({
          example: item.example,
          editMode: false
        });
      }
    });

    intents.responses.forEach((item) => {
      if (item) {
        this.responses.push({
          name: item,
          editMode: false
        });
      }
    });
    this.examplesNew = intents.examples;
    this.responsesNew = intents.responses;
    this.intentId = intents.id;
  }

  private clearData() {
    this.form.reset();
    this.examples = [];
    this.responses = [];
    this.examplesNew = [];
    this.responsesNew = [];
  }
}
