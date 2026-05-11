import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-categoria-list-page',
  imports: [AsyncPipe],
  templateUrl: './categoria-list-page.html',
  styleUrl: './categoria-list-page.scss',
})
export class CategoriaListPage {
  private readonly categoriaService = inject(CategoriaService);
  // $ convencao que indica que essa variável é um Observable
  // Ela representa uma resposta assíncrona que virá da API.
  categorias$: Observable<Categoria[]> = this.categoriaService.listar();
}