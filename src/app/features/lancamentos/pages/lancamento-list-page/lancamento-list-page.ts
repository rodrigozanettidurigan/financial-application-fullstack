import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { LancamentoResumo } from '../../models/lancamento.model';
import { LancamentoService } from '../../services/lancamento';

@Component({
  selector: 'app-lancamento-list-page',
  imports: [AsyncPipe, DatePipe, CurrencyPipe],
  templateUrl: './lancamento-list-page.html',
  styleUrl: './lancamento-list-page.scss',
})
export class LancamentoListPage {
  private readonly lancamentoService = inject(LancamentoService);

  lancamentos$: Observable<LancamentoResumo[]> = this.lancamentoService.listar();
}