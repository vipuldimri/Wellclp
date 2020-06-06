import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';
import { SelectAddressComponent } from './select-address/select-address.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocationPageRoutingModule
  ],
  entryComponents: [AddressComponent , SelectAddressComponent],
  exports: [SelectAddressComponent , AddAddressComponent],
  declarations: [LocationPage , AddAddressComponent , AddressComponent , SelectAddressComponent]
})
export class LocationPageModule {}
