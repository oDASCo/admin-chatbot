import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ConversationService} from '../shared/services/conversation.service';
import {IntentService} from '../../intents-page/shared/services/intent.service';
import {IMessages} from '../../shared/interfaces/message';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-report-conversation',
  templateUrl: './report-conversation.component.html',
  styleUrls: ['./report-conversation.component.scss']
})
export class ReportConversationComponent implements OnInit {

  public conversationId: string;
  public messages: IMessages;
  public intents = [];
  public popupData: any;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private intentService: IntentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.conversationId = params.id;
      this.getConversation();
      this.getIntentNames();
    });
  }

  public editIntent(i) {
    this.messages[i].isChangeIntentMode = true;
    this.messages[i].newIntentName = null;
  }

  public openSelect(i) {
    this.messages[i].isSelectOpen = !this.messages[i].isSelectOpen;
  }

  public closeSelect(i) {
    this.messages[i].isSelectOpen = false;
  }

  public changeSelectedValue(i, value, message, intentId) {
    this.messages[i].selectedValue = value;
    this.messages[i].newIntentId = intentId;
    console.log(message);
    this.openPopup(i, message);
    this.closeSelect(i);
  }

  public closeEditIntent(i) {
    this.messages[i].isChangeIntentMode = false;
  }

  public onIntentChange(newIntentMessage) {
    this.messages[newIntentMessage.messageId].newIntentName = newIntentMessage.newIntentName;
    this.messages[newIntentMessage.messageId].isChangeIntentMode = false;
  }

  private openPopup(i, message) {
    this.popupData = {
      messageId: i,
      messageText: message.text,
      messageIntent: message.selectedValue,
      messageIntentId: message.newIntentId
    };
  }

  private getIntentNames() {
    this.intentService.getIntentsNames(this.authService.user.chatbot.id).subscribe((data) => {
      this.intents = data.intents;
    });
  }

  private getConversation() {
    this.conversationService.getConversationBySessionId(this.authService.user.chatbot.id, this.conversationId)
      .subscribe((data) => {
      this.messages = data.conversation.messages;
      this.messages.forEach((item) => {
        item.isSelectOpen = false;
        item.selectedValue = item.intentName;
      });
    });
  }
}
