import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { LancamentoResumo } from '../models/lancamento.model';
import { PageResponse } from '../../../core/models/page-response.model';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/lancamentos';

  listar(): Observable<LancamentoResumo[]> {
    const params = new HttpParams()
    .set('resumo', '');

    return this.http
      .get<PageResponse<LancamentoResumo>>(this.apiUrl, { params })
      .pipe(map(response => response.content));
  }
}