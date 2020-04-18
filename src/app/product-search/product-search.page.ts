import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})
export class ProductSearchPage implements OnInit {
  @ViewChild('mainSearchbar' , {static : true}) searchBar;
  ProductList = [];
  SearchCount = 0;
  SearchTxt = '';
  constructor(private ProductS: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
        setTimeout(() => {
          this.searchBar.setFocus();
        }, 150);
  }

  GetProducts(query) {
      this.ProductS.ProductSearch(query)
      .subscribe(
        (Data: any) => {
              if (Data.Status) {
                  this.ProductList =  Data.data;
                  // console.log(this.ProductList);
                  console.log(Data);
                  this.SearchCount =  Data.TotalCount;
              }
        }
      );
  }

  SearchEvent(event) {
    const query = event.target.value.toLowerCase();
    this.GetProducts(query);
  }

  goProducts(product) {
    this.router.navigate(['main/product-detail' ,  product.product_id]
    );
  }

  SearchList() {
    this.router
    .navigate( ['main/products-list', this.SearchTxt ] , { queryParams: { option: '1'} ,
     queryParamsHandling: 'merge' }  );
  }
}
