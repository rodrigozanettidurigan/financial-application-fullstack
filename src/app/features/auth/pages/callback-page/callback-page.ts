import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-callback-page',
  imports: [],
  templateUrl: './callback-page.html',
  styleUrl: './callback-page.scss',
})
export class CallbackPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  mensagem = 'Finalizando Login...';

  constructor() {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      this.mensagem = 'Código de autenticação não encontrado.';
      return;
}

  this.authService.trocarCodePorToken(code, state).subscribe({
    next: () => {
      this.router.navigate(['/lancamentos']);
    },
    error: (erro) => {
      console.error('Erro ao trocar código por token:', erro);
      this.mensagem = 'Não foi possível finalizar o login.';
    },
  });
  }
}
