import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-an-account',
  templateUrl: './create-an-account.component.html',
  styleUrls: ['./create-an-account.component.scss']
})
export class CreateAnAccountComponent implements OnInit {
  public registerForm: FormGroup;
  public formSubmitted = false;
  public formSended = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.formGroup();
  }

  public onSubmit() {
    this.formSubmitted = true;
    const user = {
      chatbotName: this.registerForm.value.chatbotName,
      email: this.registerForm.value.username,
      fullName: this.registerForm.value.fullName,
      mobilePhone: this.registerForm.value.phone,
      password: this.registerForm.value.password
    };
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
        this.authService.signUp(user).subscribe(() => {
          this.registerForm.reset();
          this.formSended = true;
        });
      }
    }
  }

  public returnToLogin() {
    this.router.navigate(['/login']);
  }

  private formGroup() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      chatbotName: ['', Validators.required]
    });
  }
}
