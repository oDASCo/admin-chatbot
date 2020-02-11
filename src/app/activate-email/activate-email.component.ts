import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss']
})
export class ActivateEmailComponent implements OnInit {

  private activationCode: string;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authService.activationCode = this.router.url.split('/').reverse()[0];
    this.authService.activateEmail().subscribe(() => {});
  }

}
