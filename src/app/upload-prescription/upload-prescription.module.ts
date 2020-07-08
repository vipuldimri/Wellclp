import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPrescriptionPageRoutingModule } from './upload-prescription-routing.module';

import { UploadPrescriptionPage } from './upload-prescription.page';
import { DoneComponent } from '../Common/done/done.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPrescriptionPageRoutingModule
  ],
  declarations: [UploadPrescriptionPage , DoneComponent],
  entryComponents : [DoneComponent]
})
export class UploadPrescriptionPageModule {}
