import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { email, form, FormField, required, schema } from '@angular/forms/signals';
import { Validators } from '@angular/forms';
import { Login } from '../../../models/login.model';
import { AuthService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormField],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private readonly router = inject(Router);
  private readonly AuthService = inject(AuthService);
  private toastr = inject(ToastrService);

  readonly loading = signal(false);
  readonly error = signal('');

  readonly loginModel = signal<Login>({
    username: '',
    password: ''
  });

  readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Email is required' });
    email(schemaPath.username, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' })
  });

  onSubmit(event: SubmitEvent) {

    event.preventDefault();

    this.loading.set(true);
    this.error.set('');

    this.AuthService.login({
      username: 'emilys',
      password: 'emilyspass',
    }).subscribe({
      next: () => { this.toastr.success('Login Successful'); this.router.navigate(['/recipe']) },
      error: (error) => this.toastr.error(error.error.message)
    });

  }
}