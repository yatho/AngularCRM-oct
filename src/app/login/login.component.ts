import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authent = inject(AuthenticationService);

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

    console.log('authent.authentUser', res);
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
