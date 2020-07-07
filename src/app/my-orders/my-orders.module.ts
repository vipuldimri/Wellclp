import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { OrderDetailsComponent } from './order-details/order-details.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersPageRoutingModule
  ],
  declarations: [MyOrdersPage , OrderDetailsComponent ] ,
})
export class MyOrdersPageModule {}
