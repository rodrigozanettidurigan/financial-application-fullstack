import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { map } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { PageResponse } from '../../../core/models/page-response.model';

import { Pessoa } from '../models/pessoa.model';




@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${API_CONFIG.baseUrl}/pessoas`;

  listar(): Observable<Pessoa[]> {
   return this.http
   .get<PageResponse<Pessoa>>(this.apiUrl)
   .pipe(map(response => response.content));
  }
}
