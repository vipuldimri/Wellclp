import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPage } from './location.page';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';

const routes: Routes = [
  {
    path: '',
    component: LocationPage
  },
  {
    path: 'address',
    component: AddressComponent
  },
  {
    path: 'newaddress',
    component: AddAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {}
