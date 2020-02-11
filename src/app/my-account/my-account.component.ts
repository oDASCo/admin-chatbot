import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public changePassForm: FormGroup;
  public formSubmitted = false;
  public formSended = false;

  constructor(private fb: FormBuilder,
              public authService: AuthService) {}

  ngOnInit() {
    this.changePassForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.formSubmitted = true;
    const data = {
      newPassword: this.changePassForm.value.newPassword,
      password: this.changePassForm.value.oldPassword,
      userId: this.authService.user.id
    };
    if (this.changePassForm.valid) {
      if (this.changePassForm.value.newPassword === this.changePassForm.value.confirmPassword) {
        this.authService.changePassword(data).subscribe(() => {
          this.formSended = true;
          this.formSubmitted = false;
          this.changePassForm.reset();
        });
      }
    }
  }
}
