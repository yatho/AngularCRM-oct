import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authent = inject(AuthenticationService);
  private router = inject(Router);

  constructor() {
    if (this.authent.authenticated) {
      this.authent.disconnect();
    }
  }

  public loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, checkPassword],
      nonNullable: true,
    }),
  });

  onSubmit(): void {
    console.log('submit', this.loginForm.value);

    const { login, password } = this.loginForm.getRawValue();
    const res = this.authent.authentUser(login, password);
    if (!res) return;

    console.log('authent.authentUser', res);
    this.router.navigate(['/home']);
  }
}

function checkPassword(c: AbstractControl<string>): ValidationErrors | null {
  if (c.value.length < 5) {
    return {
      checkPassword: 'Error control password',
    };
  }
  return null;
}
