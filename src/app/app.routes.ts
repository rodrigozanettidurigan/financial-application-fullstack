import { Routes } from '@angular/router';

import { MainLayout } from './core/layout/main-layout/main-layout';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { CategoriaListPage } from './features/categorias/pages/categoria-list-page/categoria-list-page';
import { PessoaListPage } from './features/pessoas/pages/pessoa-list-page/pessoa-list-page';
import { LancamentoListPage } from './features/lancamentos/pages/lancamento-list-page/lancamento-list-page';
import { LancamentoFormPage } from './features/lancamentos/pages/lancamento-form-page/lancamento-form-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
   {
    path: 'categorias',
    component: CategoriaListPage
  },
  {
    path: 'pessoas',
    component: PessoaListPage
  },
  {
    path: 'lancamentos',
    component: LancamentoListPage,
  },
  {
  path: 'lancamentos/novo',
  component: LancamentoFormPage,
  },
  {
  path: 'lancamentos/:codigo',
  component: LancamentoFormPage,
  },  
    ],
  },
];