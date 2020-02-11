import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.formGroup();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data) => {
          this.authService.isLoggedIn = true;
          this.router.navigate(['/intents-page/intents'], {queryParams: {pageNumber: 1}});
          this.authService.user = data.body.user;
          this.authService.chatbots = data.body.chatbots;
        },
        error => {
          console.log('Auth error');
        });
    }
  }

  private formGroup() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
