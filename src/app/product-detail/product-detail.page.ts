import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonProviderService } from '../services/CommonProvider.service';
import { LoadingController, Platform, ModalController } from '@ionic/angular';
import { LocationService } from '../services/location/location.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ImageViewerComponent } from '../main/common/imageViewer/imageViewer.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit , OnDestroy {

  CurrentProduct;
  Prices;
  SelectedPrice;
  Images;
  ShowProduct =  false;
  count = 1;
  CartProduct;
  CartCount;
  breakcrumb;

  ShowGoToCart =  false;
  RelatedProducts = [];
  Location = 'Not set';
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 15,
    centeredSlides: false
  };
  LoadingObj;
  LogedInUser: User;
  ProductCardWidth = 150;
  ProductCardHeight = 150;
  AttributeList = [];
  TempList = [];
  InvalidCombination =  false;

  ShowErroPage =  false;

  constructor(private ProductS: ProductService,
              private photoViewer: PhotoViewer,
              private route: ActivatedRoute,
              private router: Router,
              private cartS: CartService,
              private socialSharing: SocialSharing,
              private commonP: CommonProviderService,
              private LocationS: LocationService,
              private AuthS: AuthService,
              private platform: Platform,
              public modalController: ModalController,
              public loadingController: LoadingController) { }
  ngOnInit() {

    this.platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      // const k =  (this.platform.height() * 22 ) / 100;
      //  this.SliderImageHeight = k;
      // console.log(k);
      console.log('Height: ' + this.platform.height());
      console.log('Width: ' + this.platform.width());
      this.ProductCardWidth =  (this.platform.width() * 38) / 100;
      this.ProductCardHeight =  (this.platform.height() * 15) / 100;
    });

    this.LogedInUser =  this.AuthS.GetLoginUser();
    // console.log(this.LogedInUser);
    this.route.params.subscribe(params => {
        const id = params.id;
        this.ShowProduct =  false;
        this.ShowErroPage =  false;
        // const id =  this.route.snapshot.params.id;
        this.GetProductData(id);
    });

    this.CartCount =  this.cartS.GetCount();
    this.cartS.cartCountsubject.subscribe(
      (data: number) => {
        this.CartCount =  data;
      }
    );
    // this.LocationS.GetLocation().then((Data: any) => {
    //   this.Location  = Data;
    // });
  }

  async GetProductData(id) {

        await this.presentLoading();
        this.ProductS.GetProductDetails(id)
        .subscribe(
          async (Data: any) => {
              this.ShowProduct =  true;
              console.log(Data);
              if (Data.Status) {
               this.CurrentProduct =  Data.data[0].product;
               this.Prices =  Data.data[0].price;
               this.Images =  Data.data[0].images;
               this.CartProduct =  Data.data[0];
               this.breakcrumb =  Data.data[0].breakcrumb;
               this.RelatedProducts = Data.data[0].RelatedProducts;
               this.SelectedPrice =  this.Prices[0];


               this.SelectedPrice.attibutelist.forEach(element => {
                   this.TempList.push(element.attibute);
               });

               console.log(this.SelectedPrice);
               this.AttributeList =  Data.data[0].AttributeList;
              //  this.AttributeList.forEach(element => {
              //      this.TempList.push('');
              //  });
              } else {
                this.ShowErroPage =  true;
                alert('Something went wrong');
              }
              await  this.LoadingObj.dismiss();
          },
          async (error) => {
            await  this.LoadingObj.dismiss();
            this.ShowProduct =  true;
            this.ShowErroPage =  true;
            alert('Something went wrong');
          }
        );
  }
  async ViewPrescription(img) {
  //   console.log(img);
  //   const options = {
  //     share: true, // default is false
  //     closeButton: false, // default is true
  //     copyToReference: true, // default is false
  //     headers: '',  // If this is not provided, an exception will be triggered
  //     piccasoOptions: { } // If this is not provided, an exception will be triggered
  // };
  //   this.photoViewer.show(img[0], this.CurrentProduct.product_name , options);

  const modal = await this.modalController.create({
    component: ImageViewerComponent,
    componentProps: {
      Images :  this.Images
    }
  });
  await modal.present();

  }

  IncCount() {
    this.count =  this.count + 1;
  }

  DexCount() {
      if (this.count - 1 > 0) {
        this.count =  this.count - 1;
      }
  }

  Addtocart() {

    const formData = new FormData();
    formData.append('productid', this.CurrentProduct.product_id);
    formData.append('attributeid', this.SelectedPrice.attribute_id);
    formData.append('attributeidvalue', this.SelectedPrice.attribute_id_value);
    formData.append('userid', this.LogedInUser.UserId + '');
    formData.append('quantity', this.count + '');
    this.cartS.AddProduct(formData)
      .subscribe(
        (RES: any) => {
              if (RES.Status) {
                this.CartCount =  RES.cart_count;
                this.commonP.presentToast('Product added to cart');
                if (this.CartCount >= 1) {
                      this.ShowGoToCart =  true;
                }
              } else {
                alert(RES.Mess);
              }
        },
        (error) => {
          alert('Something went wrong.');
        }

      );
  }
  Share() {
    const options = {
      message: 'Check out this item',
      url: 'wellclap://product-detail/918',
    };
    this.socialSharing.shareWithOptions(options);
  }

  Nevigatetoproduct(product) {
    this.ShowProduct =  false;
    this.router.navigate(['main/product-detail', product.product_id] ,
);
  }

  async presentLoading() {
    this.LoadingObj = await this.loadingController.create({
      message: 'Please wait...'
    });
    await  this.LoadingObj.present();
  }

  NevigatetoCart() {
    this.router.navigate(['main/my-cart']);
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

  AttributeChange(index , value) {
      console.log(index);
      console.log(value);


      let NewPrice;

      let found =  false;
      this.Prices.forEach(element => {
          // if (element.attibutelist[index].attibute === value) {
          //   found =  true;
          //   NewPrice = element;
          // }
          let tempfound =  true;
          let count = 0;
          element.attibutelist.forEach(element2 => {
              if (element2.attibute !== this.TempList[count]) {
                  tempfound = false;
              }
              count = count + 1;
          });

          if (tempfound === true) {
            NewPrice = element;
            found =  true;
          }


      });

      if (!found) {
          this.InvalidCombination =  true;
          this.SelectedPrice =  null;
      } else {
        this.SelectedPrice =  NewPrice;
        this.InvalidCombination =  false;
      }

  }

  Nevigatetocategory(catid) {
    this.router
    .navigate( ['main/products-list', catid ] , { queryParams: { option: '0'} ,
     queryParamsHandling: 'merge' }  );
  }

  async ngOnDestroy(): Promise<void> {
    await  this.LoadingObj.dismiss();
  }
}
