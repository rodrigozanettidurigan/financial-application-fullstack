import { Routes } from '@angular/router';

import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { CategoriaListPage } from './features/categorias/pages/categoria-list-page/categoria-list-page';
import { PessoaListPage } from './features/pessoas/pages/pessoa-list-page/pessoa-list-page';

export const routes: Routes = [
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
  }
];