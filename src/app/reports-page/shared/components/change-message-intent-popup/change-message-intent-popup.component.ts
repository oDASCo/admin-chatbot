import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConversationService} from '../../services/conversation.service';
import {IntentService} from '../../../../intents-page/shared/services/intent.service';
import {AuthService} from '../../../../login/auth.service';

@Component({
  selector: 'app-change-message-intent-popup',
  templateUrl: './change-message-intent-popup.component.html',
  styleUrls: ['./change-message-intent-popup.component.scss']
})
export class ChangeMessageIntentPopupComponent {
  @Input() popupData: any;
  @Output() btnAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private intentService: IntentService,
    private authService: AuthService
  ) {}

  public closePopup() {
    this.popupData = null;
  }

  public updateIntentName() {
    const data = {
      messageId: this.popupData.messageId,
      newIntentName: this.popupData.messageIntent,
      intentId: this.popupData.messageIntentId
    };
    const example = {
      examples: [this.popupData.messageText]
    };
    this.intentService.addExample(this.authService.user.chatbot.id, data.intentId, example).subscribe(() => {
      this.btnAction.emit(data);
      this.closePopup();
    });
  }
}
