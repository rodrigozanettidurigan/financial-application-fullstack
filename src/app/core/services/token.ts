import { Injectable } from '@angular/core';

import { JwtPayload } from '../models/jwt-payload.model';

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

  obterPayload(): JwtPayload | null {
    const token = this.obterAccessToken();
    
    if (!token) {
      return null;
    }
    
    const partes = token.split('.');

    if (partes.length !== 3) {
      return null;
    }

    try {
      const payloadBase64Url = partes[1];

      const payloadBase64 = payloadBase64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/');
      
      const payloadJson = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map((char) => {
            return `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`;
          })
          .join('')
      );

      
      return JSON.parse(payloadJson) as JwtPayload;
    } catch (error) {
      console.error('Erro ao decodificar JWT:', error);
      return null;
    } 
}

  obterPermissoes(): string[] {
      const payload = this.obterPayload();

      return payload?.authorities ?? [];
    }

    obterUsuario(): string | null {
      const payload = this.obterPayload();

      return payload?.sub ?? null;
    }

    tokenExpirado(): boolean {
      const payload = this.obterPayload();

      if (!payload?.exp) {
        return true;
      }

      const agoraEmSegundos = Math.floor(Date.now() / 1000);

      return payload.exp <= agoraEmSegundos;
    }

    possuiTokenValido(): boolean {
      return this.possuiToken() && !this.tokenExpirado();
    }
  }
