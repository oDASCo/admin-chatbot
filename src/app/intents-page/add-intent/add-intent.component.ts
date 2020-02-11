import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IntentService} from '../shared/services/intent.service';
import {IExamples} from '../../shared/interfaces/example';
import {IResponses} from '../../shared/interfaces/response';
import {EntityService} from '../../entities-page/shared/services/entity.service';
import {IEntitiesInIntent} from '../../shared/interfaces/entityInIntent';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-add-intent',
  templateUrl: './add-intent.component.html'
})
export class AddIntentComponent implements OnInit {
  public form: FormGroup;
  public exampleForm: FormGroup;
  public responseForm: FormGroup;
  public examples: IExamples = [];
  public responses: IResponses = [];
  public entityName = '';
  private examplesNew = [];
  private editedExample;
  private responsesNew = [];
  private editedResponse;
  public isEmptyExamples = false;
  public isIntentNameEmpty = false;

  constructor(
    private fb: FormBuilder,
    private intentService: IntentService,
    private entityService: EntityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formGroup();
  }

  public closeSelect(example, ind) {
    example.entities[ind].isSelectOpen = false;
  }

  public openSelect(example, i) {
    example.entities[i].isSelectOpen = !example.entities[i].isSelectOpen;
  }

  public changeSelectValue(value, example, ind) {
    example.entities[ind].selectedValue = value;
    example.example[example.entities[ind].wordPos].word = value;
    example.entities[ind].oldWord = value;
  }

  public openEntities(example, i) {
    this.examples[i].isEntitiesOpen = true;
  }

  public closeEntities(example, i) {
    this.examples[i].isEntitiesOpen = false;
  }

  public onSubmit() {
    const responses = [];
    this.responsesNew.forEach((item) => {
      if (item) {
        responses.push(item.name);
      }
    });
    const data = {
      intent: {
        description: this.form.value.intentName,
        name: this.form.value.intentName,
        examples: this.examplesNew,
        responses
      }
    };

    if (this.form.value.intentName === '') {
      this.isIntentNameEmpty = true;
    }

    if (!this.examplesNew.length) {
      this.isEmptyExamples = true;
    } else {
      if (this.form.valid) {
        this.intentService.addIntent(this.authService.user.chatbot.id, data).subscribe(() => {
          this.clearData();
        });
      }
    }
  }

  public onAddIntentName() {
    this.isIntentNameEmpty = false;
  }

  public onExampleAdd() {
    this.isEmptyExamples = false;
    if (this.exampleForm.valid) {
      const intentExample = {
        intentExample: this.exampleForm.value.newExample
      };

      this.findEntity(intentExample);
      this.examplesNew.push(
        {example: this.exampleForm.value.newExample}
      );
      this.exampleForm.reset();
    }
  }

  public deleteEntity(example, i) {
    example.entities[i].entityExamples = null;
    example.entities.splice(i, 1);
    if (example.entities.length < 1) {
      example.entities = null;
      this.closeEntities(example, i);
    }
  }

  public deleteExample(id) {
    this.examples.splice(id, 1);
    this.examplesNew.splice(id, 1);
  }

  public editExample(id) {
    this.examples[id] = {
      example: [
        {word: this.examplesNew[id].example}
      ],
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
      example: [
        {word: this.examplesNew[id].example}
      ],
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

  private formGroup() {
    this.form = new FormGroup({
      intentName: new FormControl('', [Validators.required])
    });
    this.exampleForm = new FormGroup({
      newExample: new FormControl('', [Validators.required])
    });
    this.responseForm = new FormGroup({
      newResponse: new FormControl('', [Validators.required])
    });
  }

  private clearData() {
    this.form.reset();
    this.examples = [];
    this.responses = [];
    this.examplesNew = [];
    this.responsesNew = [];
  }

  private findEntity(intentExample) {
    this.entityService.findEntityByExample(this.authService.user.chatbot.id, intentExample).subscribe((data) => {
      const entities: IEntitiesInIntent = [];
      const entitiesWords = [];
      const resultExamples = [];
      intentExample.intentExample.split(' ').forEach(elem => resultExamples.push({word: elem}));
      data.searchWords.forEach(item => this.transformData(entities, item, intentExample, entitiesWords));
      resultExamples.forEach((word) => {
        entitiesWords.forEach((elem) => {
          if (word.word === elem.entityWord) {
            word.entityName = elem.entityName;
            word.wordPosition = elem.wordPosition;
          }
        });
      });
      this.examples.push(
        {
          example: resultExamples,
          editMode: false,
          searchEntities: data.searchWords.entities,
          isEntitiesOpen: false,
          entities
        }
      );

    });
  }

  private transformData(entities, item, intentExample, entitiesWords) {
    entities.push({
      entityExamples: item.entity.examples,
      selectedValue: item.searchWord,
      oldWord: item.searchWord,
      wordPos: intentExample.intentExample.split(' ').indexOf(item.searchWord),
      isSelectOpen: false,
      entityName: item.entity.name
    });
    entitiesWords.push({
      entityWord: item.searchWord,
      entityName: item.entity.name,
      wordPosition: intentExample.intentExample.split(' ').indexOf(item.searchWord)
    });
  }

}
