import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ProductsListPageModule } from '../products-list/products-list.module';
import { HomePageModule } from '../home/home.module';
import { LocationPageModule } from '../location/location.module';
import { MyAddressPageModule } from '../my-address/my-address.module';
import { MyOrdersPageModule } from '../my-orders/my-orders.module';
import { NotificationsPageModule } from '../notifications/notifications.module';
import { ProductSearchPageModule } from '../product-search/product-search.module';
import { ProductDetailPageModule } from '../product-detail/product-detail.module';
import { ProfilePageModule } from '../profile/profile.module';
import { UploadPrescriptionPageModule } from '../upload-prescription/upload-prescription.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    ProductsListPageModule,
    HomePageModule,
    LocationPageModule,
    MyAddressPageModule,
    MyOrdersPageModule,
    NotificationsPageModule,
    ProductSearchPageModule,
    ProductDetailPageModule,
    ProfilePageModule,
    UploadPrescriptionPageModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
