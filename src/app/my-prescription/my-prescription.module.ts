import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MyPrescriptionPage } from './my-prescription.page';
import { CommonModuleModule } from '../Common/CommonModule/CommonModule.module';
import { ProductDetailPageModule } from '../product-detail/product-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageModule
  ],
  declarations: [MyPrescriptionPage]
})
export class MyPrescriptionPageModule {}
