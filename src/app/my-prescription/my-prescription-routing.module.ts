import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPrescriptionPage } from './my-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: MyPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPrescriptionPageRoutingModule {}
