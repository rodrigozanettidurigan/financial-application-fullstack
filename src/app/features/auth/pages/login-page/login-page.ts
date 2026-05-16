import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly authService = inject(AuthService);

  entrar(): void {
    this.authService.iniciarLogin();
  }
}
