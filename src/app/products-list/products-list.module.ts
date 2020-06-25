import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsListPageRoutingModule } from './products-list-routing.module';

import { ProductsListPage } from './products-list.page';
import { FilterComponent } from './filter/filter/filter.component';
import { SearchComponent } from './filter/search/search.component';
import { CategoryComponent } from './filter/category/category.component';
import { DiscountPipe } from '../Pipes/discount.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListPageRoutingModule
  ],
  declarations: [ProductsListPage , FilterComponent , DiscountPipe ,
     SearchComponent , CategoryComponent],
  entryComponents: [FilterComponent , SearchComponent , CategoryComponent],
  exports : [DiscountPipe]
})
export class ProductsListPageModule {}
