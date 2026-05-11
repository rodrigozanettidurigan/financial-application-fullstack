import { Component, inject, OnInit } from '@angular/core';

import { CategoriaService } from '../../../categorias/services/categoria';
import { Categoria } from '../../../categorias/models/categoria.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit{
  private readonly categoriaService = inject(CategoriaService);
  
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });
  }
}
