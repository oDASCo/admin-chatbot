import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../login/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public activeRoute: string;
  public chatbots: any;
  public openedSelect = false;
  public selectedChatbot: string;
  public createChatbotMode = false;
  public createChatbotForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getActiveRoute();
    this.createChatbotForm = this.fb.group({
      chatbotName: ['', Validators.required]
    });
    this.chatbots = this.authService.chatbots;
    this.selectedChatbot = this.authService.user.chatbot.name;
  }

  public logOut() {
    this.authService.logout().subscribe(() => {
      this.authService.isLoggedIn = false;
      this.router.navigate(['/login']);
    });

  }

  private getActiveRoute() {
    this.route.url.subscribe(() => {
      const currentPath = this.router.url.split('/').reverse();
      if (currentPath[0] === 'reports-page') {
        this.activeRoute = 'reports-page';
      } else if (currentPath[0] === 'create-an-account') {
        this.activeRoute = 'create-an-account';
      } else if (currentPath[0] === 'my-account') {
        this.activeRoute = 'my-account';
      } else {
        this.activeRoute = currentPath[1];
      }
    });
  }

  public closeSelect() {
    this.openedSelect = false;
  }

  public openSelect() {
    this.openedSelect = !this.openedSelect;
  }

  public changeSelectedValue(chatbot) {
    this.selectedChatbot = chatbot.name;
    this.authService.setChatbot(chatbot.id, chatbot.id).subscribe(() => {
      this.authService.user.chatbot = chatbot;
      this.router.navigate(['/intents-page/intents'], {queryParams: {pageNumber: 1}});
    });
    this.closeSelect();
  }

  public openCreateChatbot() {
    this.createChatbotMode = true;
  }

  public closeCreateChatbot() {
    this.createChatbotMode = false;
  }

  public createChatbot() {
    if (this.createChatbotForm.valid) {
      this.authService.createChatbot(this.createChatbotForm.value.chatbotName).subscribe((data) => {
        this.createChatbotForm.reset();
        this.createChatbotMode = false;
        this.authService.setChatbot(data.chatbot.id, data.chatbot.id).subscribe(() => {
          this.authService.user.chatbot = data.chatbot;
          this.chatbots.push({
            id: data.chatbot.id,
            name: data.chatbot.name
          });
          this.selectedChatbot = data.chatbot.name;
          this.router.navigate(['/intents-page/intents'], {queryParams: {pageNumber: 1}});
        });
      });
    }
  }
}
