import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly accessTokenKey = 'access_token';

  salvarAccessToken(token: string): void {
    sessionStorage.setItem(this.accessTokenKey,token);
  }

  obterAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  possuiToken(): boolean {
    return !!this.obterAccessToken(); //!! converte o resultado para booleano.
  }

  limpar(): void {
    sessionStorage.removeItem(this.accessTokenKey);
  } 
}
