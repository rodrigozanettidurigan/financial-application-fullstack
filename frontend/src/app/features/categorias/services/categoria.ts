import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';

import { Categoria } from '../models/categoria.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${API_CONFIG.baseUrl}/categorias`;

  listar(): Observable<Categoria[]> {
    return this.http
    .get<Categoria[]>(this.apiUrl);
  }
}
