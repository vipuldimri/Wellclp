import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListPage } from './products-list.page';

const routes: Routes = [
  {
    path: ':id',
    component: ProductsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsListPageRoutingModule {}
