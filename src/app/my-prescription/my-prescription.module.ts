import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPrescriptionPageRoutingModule } from './my-prescription-routing.module';

import { MyPrescriptionPage } from './my-prescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPrescriptionPageRoutingModule
  ],
  declarations: [MyPrescriptionPage]
})
export class MyPrescriptionPageModule {}
