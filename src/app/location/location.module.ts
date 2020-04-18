import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule
  ],
  entryComponents: [AddressComponent],
  declarations: [LocationPage , AddAddressComponent , AddressComponent]
})
export class LocationPageModule {}
