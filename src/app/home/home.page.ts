import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home/home.service';
import { ProductService } from '../services/product/product.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CartService } from '../services/cart/cart.service';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CallNumber]
})
export class HomePage implements OnInit {

  BestSellersProducts: [];
  BestDealsProducts: [];
  Slides: any[];
  CartCount: number;
  Categories = [];
  Location = 'Not Set';
  constructor(private router: Router,
              private HS: HomeService,
              private PS: ProductService,
              private cartS: CartService,
              private activatedRoute: ActivatedRoute,
              private locationS: LocationService,
              private callNumber: CallNumber ) { }
    sliderConfig = {
      slidesPerView: 2.5,
      spaceBetween: 15,
      centeredSlides: false
    };
  ngOnInit() {
    this.CartCount =  this.cartS.GetCount();
    this.cartS.cartCountsubject.subscribe(
      (data: number) => {
        this.CartCount =  data;
      }
    );
    // this.GetSlideShow();
    this.GetHoimeProducts();

    this.locationS.GetLocation().then((Data: any) => {
      this.Location  = Data;
    });
  }

  Upload()   {
    this.router.navigate(['main/upload-prescription']);
  }

  GetSlideShow() {
    this.HS.get_slidshow()
    .subscribe(
      (RES: any) => {
        console.log(RES);
        if (RES.Status) {
              this.Slides =  RES.data;
        } else {
            alert(RES.Mess);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  CommingSoon() {
    alert('comming soon');
  }

  GetHoimeProducts() {
        this.PS.GetHomeList()
        .subscribe(
          (Data: any) => {
             console.log(Data);
             if (Data.Status) {
             this.BestSellersProducts = Data.data.BestSeller;
             this.BestDealsProducts = Data.data.BestDeals;
             this.Categories  = Data.data.Categories;
             } else {
              alert(Data.Mess);
               // tslint:disable-next-line:no-string-literal
              navigator['app'].exitApp();
             }
          } ,
          (error) => {
            alert('something went wrong');
            // tslint:disable-next-line:no-string-literal
            navigator['app'].exitApp();
          }
        );
  }
  Search() {
    this.router.navigate(['main/tabs/product-search'] );
  }
  Call() {
    this.callNumber.callNumber('9540624611', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  Nevigatetoproduct(product) {
    this.router.navigate(['main/product-detail', product.product_id] ,
);
  }

  Nevigatetocategory(catid) {
    this.router
    .navigate( ['main/products-list', catid ] , { queryParams: { option: '0'} ,
     queryParamsHandling: 'merge' }  );
  }

}
