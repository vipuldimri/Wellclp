import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductsListPageModule } from '../products-list/products-list.module';

import { ProductDetailPage } from './product-detail.page';
import { ImageViewerComponent } from '../main/common/imageViewer/imageViewer.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    ProductsListPageModule
  ],
  declarations: [ProductDetailPage , ImageViewerComponent],
  entryComponents: [ImageViewerComponent],
  exports: [ImageViewerComponent]
})
export class ProductDetailPageModule {}
