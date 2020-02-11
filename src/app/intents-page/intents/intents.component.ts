import {Component, OnInit} from '@angular/core';
import {IntentService} from '../shared/services/intent.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {IEventPopup} from '../../shared/interfaces/event-popup';
import {IPopupData} from '../../shared/interfaces/popup-data';
import {IIntents} from '../../shared/interfaces/intent';
import {AuthService} from '../../login/auth.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html'
})
export class IntentsComponent implements OnInit {
  public intents: IIntents = [];
  public searchStr: string;
  public pagination: boolean;
  public paginationNumber: number;
  public paginationsPages = [];
  public page: number;
  public deleteIntentPopupData: IPopupData;
  public addExamplePopupData: IPopupData;
  public addResponsePopupData: IPopupData;
  public examples;
  public responses;
  public addMessageExamples;
  public addMessageResponses;
  private intentsOnPage = 6;
  private intentsCount: number;
  private eventPopup: IEventPopup;

  constructor(
    private intentService: IntentService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.searchStr = '';
    this.getIntents();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getIntents();
    });
  }

  public openDeletePopup(id) {
    this.formPopupData(id, 'deleteIntent');
    this.deleteIntentPopupData = {
      popupType: 'delete_intent',
      popupTitle: 'Delete Intent',
      popupText: `This intent will be deleted immediately. You can’t undo this action.
       Are you sure you want to delete intent ${id}?`
    };
  }

  public openAddExamplePopup(id) {
    this.formPopupData(id, 'addExamples');
    this.addExamplePopupData = {
      popupType: 'intent_addExample',
      popupTitle: 'Add Example',
      intentId: id
    };
  }

  public openAddResponsePopup(id) {
    this.formPopupData(id, 'addResponses');
    this.addResponsePopupData = {
      popupType: 'intent_addResponse',
      popupTitle: 'Add Response',
      intentId: id
    };
  }

  public onBtnAction(data) {
    if (this.eventPopup.method === 'addExamples') {
      this.examples = {
        examples: data
      };
    } else if (this.eventPopup.method === 'addResponses') {
      this.responses = {
        responses: data
      };
    }
    this.callMethod(this.eventPopup);
  }

  public addExamples() {
    this.addExamplePopupData = null;
    this.intentService.addExample(this.authService.user.chatbot.id, this.eventPopup.id, this.examples).subscribe(() => {
      this.getIntents();
      this.showMessage('addMessageExamples', `${this.examples.examples.length} new examples added`);
    });
  }

  public addResponses() {
    this.addResponsePopupData = null;
    this.intentService.addResponse(this.authService.user.chatbot.id, this.eventPopup.id, this.responses).subscribe(() => {
      this.getIntents();
      this.showMessage('addMessageResponses', `${this.responses.responses.length} new responses added`);
    });
  }

  public deleteIntent() {
    this.intentService.deleteIntent(this.authService.user.chatbot.id, this.eventPopup.id).subscribe(() => {
      this.getIntents();
      this.closePopup();
      this.rerenderPagination();
    });
  }

  public onSearch(event) {
    this.searchStr = event.target.value;
    setTimeout(() => {
      this.getIntents();
    }, 1000);
  }

  private getIntents() {
    this.route
      .queryParams
      .subscribe(params => {
        this.page = params.pageNumber || 0;
        this.intentService.getIntents(this.authService.user.chatbot.id, this.page, this.intentsOnPage, this.searchStr)
          .subscribe((data) => {
          this.intents = data.intents;
          this.setPagination(data);
        });
      });
  }

  private setPagination(data) {
    this.intentsCount = data.totalCount;
    this.paginationNumber = Math.ceil(data.totalCount / this.intentsOnPage);
    for (let i = 1; i <= this.paginationNumber; i++) {
      if (this.paginationsPages.length < this.paginationNumber) {
        this.paginationsPages.push(i);
      }
    }
    this.pagination = data.totalCount > this.intentsOnPage && data.totalCount !== 0;
  }

  private callMethod(data) {
    const method = data.method;
    this[method](data.arguments);
  }

  private showMessage(message, text) {
    this[message] = {
      text,
      id: this.eventPopup.id
    };
    setTimeout(() => {
      this[message] = null;
    }, 3000);
  }

  private closePopup() {
    this.deleteIntentPopupData = null;
  }

  private rerenderPagination() {
    this.intentsCount = this.intentsCount - 1;
    if (this.intentsCount % this.intentsOnPage === 0) {
      this.paginationsPages = this.paginationsPages.splice(this.paginationsPages.length, 1);
      this.router.navigate(['/intents-page', 'intents'], {queryParams: {pageNumber: 1}});
    }
  }

  private formPopupData(id, method) {
    this.eventPopup = {
      id,
      method
    };
  }
}
