import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { TokenService } from './token';


interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;//? significa opcional entao scope pode existir ou nao
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private readonly clientId = 'angular';
  private readonly redirectUri = `${window.location.origin}/callback`;

  async iniciarLogin(): Promise<void> {
    const codeVerifier = this.gerarCodeVerifier();
    const codeChallenge = await this.gerarCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'read write',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `${API_CONFIG.baseUrl}/oauth2/authorize?${params.toString()}`;
  }

  trocarCodePorToken(code: string, state: string): Observable<TokenResponse> {
    const stateSalvo = sessionStorage.getItem('oauth_state');

    if (!stateSalvo || stateSalvo !== state) {
      throw new Error('Estado OAuth inválido.');
    }

    const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
    
    if (!codeVerifier) {
      throw new Error('Code verifier não encontrado.');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code,
      redirect_uri: this.redirectUri,
      code_verifier: codeVerifier,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<TokenResponse>(`${API_CONFIG.baseUrl}/oauth2/token`, body.toString(), {
        headers,
      })
      .pipe(
        tap((response) => {
          this.tokenService.salvarAccessToken(response.access_token);
          sessionStorage.removeItem('pkce_code_verifier');
          sessionStorage.removeItem('oauth_state');
        })
      );
  }

  logout(): void {
    this.tokenService.limpar();
  }
  
  estaAutenticado(): boolean {
    return this.tokenService.possuiToken() !== null;
  }
  private gerarCodeVerifier(): string {
    const array = new Uint8Array(64);
    crypto.getRandomValues(array);
    return this.base64UrlEncode(array);
  }

  private async gerarCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(new Uint8Array(digest));
  }

  private base64UrlEncode(array: Uint8Array): string {
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}

