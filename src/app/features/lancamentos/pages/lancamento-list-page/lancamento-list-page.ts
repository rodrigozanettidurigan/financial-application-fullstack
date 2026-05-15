import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LancamentoResumo } from '../../models/lancamento-resumo.model';
import { LancamentoService } from '../../services/lancamento';
import { PageResponse } from '../../../../core/models/page-response.model';


@Component({
  selector: 'app-lancamento-list-page',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './lancamento-list-page.html',
  styleUrl: './lancamento-list-page.scss',
})
export class LancamentoListPage {
  private readonly lancamentoService = inject(LancamentoService);
  private readonly formBuilder = inject(FormBuilder);

  filtroForm = this.formBuilder.group({
    descricao: [''],
    dataVencimentoDe: [''],
    dataVencimentoAte: [''],
  });

  pagina?: PageResponse<LancamentoResumo>;

  carregando = false;
  erro = '';

  paginaAtual = 0;
  tamanhoPagina = 5;

  constructor() {
    this.pesquisar();
  }

  pesquisar(pagina = 0 ): void {
    this.carregando = true;
    this.erro = '';
    this.paginaAtual = pagina;


    const filtro = this.filtroForm.getRawValue();
    
    this.lancamentoService
      .pesquisar(
       { 
        descricao: filtro.descricao,
        dataVencimentoDe: filtro.dataVencimentoDe,
        dataVencimentoAte: filtro.dataVencimentoAte,
       },
       this.paginaAtual,
       this.tamanhoPagina
      )
      .subscribe({
        next: (paginaResposta) => {
          this.pagina = paginaResposta;
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao pesquisar lançamentos:', erro);
          this.erro= 'Erro ao carregar lançamentos';
          this.carregando = false;
        },
      });
}

 limpar(): void {
    this.filtroForm.reset({
      descricao: '',
      dataVencimentoDe: '',
      dataVencimentoAte: '',
    });
    this.pesquisar(0);
  }
  paginaAnterior(): void {
    if (this.pagina && !this.pagina.last) {
      this.pesquisar(this.pagina.number + 1);
    }
  }
  proximaPagina(): void {
    if (this.pagina && !this.pagina.first) {
      this.pesquisar(this.pagina.number - 1);
    }
  }
  excluir(lancamento: LancamentoResumo): void {
    const confirmado = confirm(
      `Deseja realmente excluir o lançamento "${lancamento.descricao}"?`
    );

    if (!confirmado) {
      return;
    }

    this.lancamentoService.excluir(lancamento.codigo).subscribe({
      next: () => {
        const paginaFicouVazia =
          this.pagina?.content.length === 1 && this.paginaAtual > 0;

        if (paginaFicouVazia) {
          this.pesquisar(this.paginaAtual - 1);
          return;
        }

        this.pesquisar(this.paginaAtual);
      },
      error: (erro) => {
        console.error('Erro ao excluir lançamento:', erro);
        alert('Não foi possível excluir o lançamento.');
      },
    });
  }
}
