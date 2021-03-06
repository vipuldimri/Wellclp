import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSearchPage } from './product-search.page';
import { AddressComponent } from '../location/address/address.component';
import { AddAddressComponent } from '../location/add-address/add-address.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSearchPageRoutingModule {}
