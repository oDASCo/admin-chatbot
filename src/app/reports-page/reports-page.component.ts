import {Component, OnInit} from '@angular/core';
import {ConversationService} from './shared/services/conversation.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Options} from 'ng5-slider';
import {IConversatios} from '../shared/interfaces/conversation';
import {AuthService} from '../login/auth.service';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {
  public isLevelFilter = false;
  public isIntentFilter = false;
  public isDateFilter = false;
  public conversations: IConversatios;
  public intents = [];
  public searchStr: string;
  private filterOptions = {};

  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([0, 1])
  });

  options: Options = {
    floor: 0,
    ceil: 1,
    step: 0.01
  };

  constructor(private conversationService: ConversationService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.getConversations();
    this.getIntentNames();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getConversations();
      this.getIntentNames();
    });
  }

  public openLevelFilter() {
    this.isLevelFilter = !this.isLevelFilter;
    this.isDateFilter = false;
    this.isIntentFilter = false;
  }

  public openIntentFilter() {
    this.isIntentFilter = !this.isIntentFilter;
    this.isLevelFilter = false;
    this.isDateFilter = false;
  }

  public openDateFilter() {
    this.isDateFilter = !this.isDateFilter;
    this.isLevelFilter = false;
    this.isIntentFilter = false;
  }

  public getConversationsByLevel() {
    this.filterOptions = {
      confidenceLevelEnd: this.sliderForm.value.sliderControl[1],
      confidenceLevelStart: this.sliderForm.value.sliderControl[0]
    };
    this.conversationService.getConversationsByLevel(this.authService.user.chatbot.id, this.filterOptions).subscribe((data) => {
      this.conversations = data.conversations;
      this.openLevelFilter();
    });
  }

  public getConversationsByIntents() {
    const checkedIntents = [];
    this.intents.filter((item) => item.checked).forEach((intent) => {
      checkedIntents.push(intent.name);
    });
    this.filterOptions = {
      intentNames: checkedIntents
    };
    this.conversationService.getConversationsByIntents(this.authService.user.chatbot.id, this.filterOptions).subscribe((data) => {
      this.conversations = data.conversations;
      this.openIntentFilter();
    });
  }

  public checkIntent(intent) {
    intent.checked = true;
  }

  public getDate(date) {
    this.filterOptions = {
      startDate: date.dateFromMoment,
      endDate: date.dateToMoment
    };
  }

  public getConversationsByDate() {
    this.conversationService.getConversationsByDate(this.authService.user.chatbot.id, this.filterOptions).subscribe((data) => {
      this.conversations = data.conversations;
      this.openDateFilter();
    });
  }

  private getConversations() {
    this.conversationService.getConversations(this.authService.user.chatbot.id).subscribe((data) => {
      this.conversations = data.conversations;
    });
  }

  private getIntentNames() {
    this.conversationService.getConversationsIntentNames(this.authService.user.chatbot.id).subscribe((data) => {
      data.intentNames.forEach((item) => {
        this.intents.push({
          name: item,
          checked: false
        });
      });
    });
  }
}
