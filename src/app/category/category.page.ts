import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  show =  false;
  CatList = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.Getcategories();
  }
  Getcategories() {
      this.productService.GetCategories()
      .subscribe(
        (RES: any) => {
          this.CatList =  RES.data;
          console.log(this.CatList);
        }
      );
  }

  Nevigatetocategory(catid) {
    this.router
    .navigate( ['main/products-list', catid ] , { queryParams: { option: '0'} ,
     queryParamsHandling: 'merge' }  );
  }

}
