import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Categoria } from '../../../categorias/models/categoria.model';
import { CategoriaService } from '../../../categorias/services/categoria';
import { Pessoa } from '../../../pessoas/models/pessoa.model';
import { PessoaService } from '../../../pessoas/services/pessoa';
import { LancamentoService } from '../../services/lancamento';
import { LancamentoRequest } from '../../models/lancamento-request.model';

@Component({
  selector: 'app-lancamento-form-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './lancamento-form-page.html',
  styleUrl: './lancamento-form-page.scss',
})
export class LancamentoFormPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly lancamentoService = inject(LancamentoService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly pessoaService = inject(PessoaService);     

  categorias: Categoria[] = [];
  pessoas: Pessoa[] = [];

  codigo?: number;
  carregando = false;
  salvando = false;
  erro = '';

  form = this.formBuilder.group({
    tipo: ['DESPESA', Validators.required],
    dataVencimento: ['', Validators.required],
    dataPagamento: [''],
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    valor: [0, [Validators.required, Validators.min(0.01)]],
    observacao: [''],
    codigoCategoria: [null as number | null, Validators.required],
    codigoPessoa: [null as number | null, Validators.required],
  });

  constructor() {
    this.carregarCombos();

    const codigoParam = this.route.snapshot.paramMap.get('codigo');

    if (codigoParam) {
      this.codigo = Number(codigoParam);
      this.carregarLancamento(this.codigo);
    }
  }

  get editando(): boolean {
    return !!this.codigo;
  }

  private carregarCombos(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
        this.erro = 'Erro ao carregar categorias.';
      },
    });

    this.pessoaService.listar().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (erro) => {
        console.error('Erro ao carregar pessoas:', erro);
        this.erro = 'Erro ao carregar pessoas.';
      },
    });
  }

  private carregarLancamento(codigo: number): void {
    this.carregando = true;

    this.lancamentoService.buscarPorCodigo(codigo).subscribe({
      next: (lancamento) => {
        this.form.patchValue({
          tipo: lancamento.tipo,
          dataVencimento: lancamento.dataVencimento,
          dataPagamento: lancamento.dataPagamento ?? '',
          descricao: lancamento.descricao,
          valor: lancamento.valor,
          observacao: lancamento.observacao ?? '',
          codigoCategoria: lancamento.categoria.codigo,
          codigoPessoa: lancamento.pessoa.codigo,
        });

        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar lançamento:', erro);
        this.erro = 'Erro ao carregar lançamento.';
        this.carregando = false;
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.montarRequest();

    this.salvando = true;

    const operacao$ = this.editando && this.codigo
      ? this.lancamentoService.atualizar(this.codigo, request)
      : this.lancamentoService.criar(request);

    operacao$.subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/lancamentos']);
      },
      error: (erro) => {
        console.error('Erro ao salvar lançamento:', erro);
        this.erro = 'Erro ao salvar lançamento.';
        this.salvando = false;
      },
    });
  }

  private montarRequest(): LancamentoRequest {
    const valor = this.form.getRawValue();

    return {
      tipo: valor.tipo as 'RECEITA' | 'DESPESA',
      dataVencimento: valor.dataVencimento!,
      dataPagamento: valor.dataPagamento || null,
      descricao: valor.descricao!,
      valor: Number(valor.valor),
      observacao: valor.observacao || null,
      categoria: {
        codigo: valor.codigoCategoria!,
      },
      pessoa: {
        codigo: valor.codigoPessoa!,
      },
    };
  }
}

