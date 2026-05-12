import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { map } from 'rxjs';

import { Pessoa } from '../models/pessoa.model';
import { PageResponse } from '../models/page-response.model';



@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/pessoas';

  listar(): Observable<Pessoa[]> {
   return this.http
   .get<PageResponse<Pessoa>>(this.apiUrl)
   .pipe(map(response => response.content));
  }
}
