import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Pessoa } from '../../models/pessoa.model';
import { PessoaService } from '../../services/pessoa';
@Component({
  selector: 'app-pessoa-list-page',
  imports: [AsyncPipe],
  templateUrl: './pessoa-list-page.html',
  styleUrl: './pessoa-list-page.scss',
})
export class PessoaListPage {
  private readonly pessoaService = inject(PessoaService);
  
  pessoas$: Observable<Pessoa[]> = this.pessoaService.listar();
}
