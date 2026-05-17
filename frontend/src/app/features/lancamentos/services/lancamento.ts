import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, zip } from 'rxjs';

import { LancamentoResumo } from '../models/lancamento-resumo.model';
import { PageResponse } from '../../../core/models/page-response.model';
import { LancamentoFiltro } from '../models/lancamento-filtro.model';
import { LancamentoRequest } from '../models/lancamento-request.model';
import { LancamentoDetalhe } from '../models/lancamento-detalhe.model';



@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/lancamentos';

  pesquisar(
    filtro: LancamentoFiltro = {},
    pagina = 0,
    tamanho = 5
  ): Observable<PageResponse<LancamentoResumo>> {
    let params = new HttpParams()
      .set('resumo', 'true')
      .set('page', pagina)
      .set('size', tamanho)
      .set('sort', 'dataVencimento,desc');

    if (filtro.descricao?.trim()) {
      params = params.set('descricao', filtro.descricao.trim());
    }
    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoDe);
    }
    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoAte);
    }

    return this.http.get<PageResponse<LancamentoResumo>>(this.apiUrl, { params });
  }
    excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }

  listar(filtro: LancamentoFiltro = {}): Observable<LancamentoResumo[]> {
    let params = new HttpParams()
    .set('resumo', 'true');

    if (filtro.descricao?.trim()) {
     params = params.set('descricao', filtro.descricao.trim());
    }
    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoDe);
    }
    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoAte);
    } 
    
    return this.http
      .get<PageResponse<LancamentoResumo>>(this.apiUrl, { params })
      .pipe(map(response => response.content));
  }
  buscarPorCodigo(codigo: number): Observable<LancamentoDetalhe> {
    return this.http.get<LancamentoDetalhe>(`${this.apiUrl}/${codigo}`);
  }

  criar(lancamento: LancamentoRequest): Observable<LancamentoDetalhe> {
    return this.http.post<LancamentoDetalhe>(this.apiUrl, lancamento);
  }
  atualizar(codigo: number, lancamento: LancamentoRequest): Observable<LancamentoDetalhe> {
    return this.http.put<LancamentoDetalhe>(`${this.apiUrl}/${codigo}`, lancamento);
  }





}  