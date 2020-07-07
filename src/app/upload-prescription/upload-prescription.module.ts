import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPrescriptionPageRoutingModule } from './upload-prescription-routing.module';

import { UploadPrescriptionPage } from './upload-prescription.page';
import { CommonModuleModule } from '../Common/CommonModule/CommonModule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPrescriptionPageRoutingModule,
    CommonModuleModule
  ],
  declarations: [UploadPrescriptionPage ],
})
export class UploadPrescriptionPageModule {}
