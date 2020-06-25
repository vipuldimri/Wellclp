import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home/home.service';
import { ProductService } from '../services/product/product.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CartService } from '../services/cart/cart.service';
import { LocationService } from '../services/location/location.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CallNumber]
})
export class HomePage implements OnInit {
  clickSub: any;
  BestSellersProducts: [];
  BabyCare: [] = [];
  BestDealsProducts: [];
  Slides: any[];
  CartCount: number;
  Categories = [];
  Location = 'Not Set';
  SliderImageHeight = 200;
  ProductCardHeight = 150;
  ProductCardWidth =  150;
  CategoryImgHeight = 55;
  constructor(private router: Router,
              private HS: HomeService,
              private PS: ProductService,
              private cartS: CartService,
              private fcm: FCM,
              private appUpdate: AppUpdate,
              private ngZone: NgZone,
              private platform: Platform,
              private localNotifications: LocalNotifications,
              private activatedRoute: ActivatedRoute,
              private locationS: LocationService,
              private callNumber: CallNumber ) { }
    sliderConfig = {
      slidesPerView: 2.5,
      spaceBetween: 15,
      centeredSlides: false
    };

    sliderCatConfig = {
      slidesPerView: 4.4,
      spaceBetween: 6,
      centeredSlides: false
    };

    sliderBrandConfig = {
      slidesPerView: 2.5,
      spaceBetween: 3,
      centeredSlides: false
    };
  ngOnInit() {

    // const updateUrl = 'https://www.wellclap.com/vaibhavapp/ionicapp/AppUpdate/update.xml';
    // this.appUpdate.checkAppUpdate(updateUrl)
    // .then(() => {
    //   alert('Update Avaliable');
    //   console.log('Update available');
    // }
    // )
    // .catch((error) =>{
    //      console.log(error);
    // })
    // ;

    this.platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      const k =  (this.platform.height() * 22 ) / 100;
      this.SliderImageHeight = k;
      console.log(k);
      console.log('Height: ' + this.platform.height());
      console.log('Width: ' + this.platform.width());
      this.ProductCardHeight =  (this.platform.height() * 15) / 100;
      this.ProductCardWidth =  (this.platform.width() * 38) / 100;
      this.CategoryImgHeight = (this.platform.height() * 4) / 100;
    });


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

    this.fcm.onNotification()
    .subscribe(data => {
    if (data.wasTapped) {
      //     "Belongs" => $Belongs,
      //     "Parent_ID" => $ParentID
      console.log('Received in background');
      console.log(data);
      if (data.Belongs === '1') {
         this.ngZone.run(() => {
          this.router
          .navigate( ['main/products-list', data.Parent_ID ] , { queryParams: { option: '0'} ,
           queryParamsHandling: 'merge' }  );
        });
      } else if (data.Belongs === '2') {
        this.ngZone.run(() => {
          this.router.navigate(['main/product-detail', data.Parent_ID]);
        });
      }
       // alert('Back');
    } else {
      // alert('front');

      this.localNotifications.schedule({
        id: 1,
        title: data.title,
        text: data.body ,
        data: { secret: data } ,
        smallIcon: 'https://www.wellclap.com/pictures/common/wellclap-logo-v7.png',
        icon: 'https://www.wellclap.com/pictures/common/wellclap-logo-v7.png'
      });


      this.clickSub = this.localNotifications.on('click')
      .subscribe(notification => {
            this.clickSub.unsubscribe();
        // Insert your logic here
            console.log(notification);
            if (notification.data.secret.Belongs === '1') {
              this.ngZone.run(() => {
                this.router
                .navigate( ['main/products-list', notification.data.secret.Parent_ID ] , { queryParams: { option: '0'} ,
                 queryParamsHandling: 'merge' }  );
              });

            } else if (notification.data.secret.Belongs === '2') {
              this.ngZone.run(() => {
                this.router.navigate(['main/product-detail', notification.data.secret.Parent_ID]);
              });
            }
      });
      console.log('Received in foreground');
      console.log(data);
      // if (data.Belongs === '1') {
      //   this.router
      //   .navigate( ['main/products-list', data.Parent_ID ] , { queryParams: { option: '0'} ,
      //    queryParamsHandling: 'merge' }  );
      // } else if (data.Belongs === '2') {
      //   this.router.navigate(['main/product-detail', data.Parent_ID]);
      // }
    }
  }
  ,
  (erro) => {
    // alert('ERROr');
    console.log(erro);
  }
  );


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
             // this.BabyCare  = Data.data.BabyCare;
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

  Nevigatetobrand(brandid) {
    this.router
    .navigate( ['main/products-list', brandid ] , { queryParams: { option: '2'} ,
     queryParamsHandling: 'merge' }  );
  }



  Showsale(Actualprice: number , SellingPrice: number) {
    if (Actualprice <= SellingPrice) {
      return false;
    }
    const   Discount = (Math.ceil(Actualprice) - Math.ceil(SellingPrice) ) / Math.ceil(Actualprice);
    if ( Math.ceil(Discount * 100)  >= 30) {
      return true;
    } else {
      return false;
    }
  }


}
