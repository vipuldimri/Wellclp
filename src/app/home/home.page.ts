import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home/home.service';
import { ProductService } from '../services/product/product.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CartService } from '../services/cart/cart.service';
import { LocationService } from '../services/location/location.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CallNumber]
})
export class HomePage implements OnInit {
  clickSub: any;
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
              private fcm: FCM,
              private ngZone: NgZone,
              private localNotifications: LocalNotifications,
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
    alert('ERROr');
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
