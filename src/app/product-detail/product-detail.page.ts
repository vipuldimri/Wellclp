import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonProviderService } from '../services/CommonProvider.service';
import { LoadingController } from '@ionic/angular';
import { LocationService } from '../services/location/location.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  CurrentProduct;
  Prices;
  SelectedPrice;
  Images;
  ShowProduct =  false;
  count = 1;
  CartProduct;
  CartCount;
  breakcrumb;
  ShowAttributes =  false;
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
  constructor(private ProductS: ProductService,
              private photoViewer: PhotoViewer,
              private route: ActivatedRoute,
              private router: Router,
              private cartS: CartService,
              private socialSharing: SocialSharing,
              private commonP: CommonProviderService,
              private LocationS: LocationService,
              private AuthS: AuthService,
              public loadingController: LoadingController) { }
  ngOnInit() {

    this.LogedInUser =  this.AuthS.GetLoginUser();
    console.log(this.LogedInUser);

    this.route.params.subscribe(params => {
        const id = params.id;
        this.ShowProduct =  false;
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
              console.log(Data);
              if (Data.Status) {
               this.CurrentProduct =  Data.data[0].product;
               this.Prices =  Data.data[0].price;

               if (this.Prices.attibute === 'NULL' || this.Prices.attibute === 'NULL') {
                    this.ShowAttributes =  false;
               } else {
                 this.ShowAttributes =  true;
               }

               this.Images =  Data.data[0].images;
               this.CartProduct =  Data.data[0];
               this.SelectedPrice =  this.Prices[0];
               this.breakcrumb =  Data.data[0].breakcrumb;
               this.ShowProduct =  true;
               this.RelatedProducts = Data.data[0].RelatedProducts;
              } else {
                alert('Something went wrong');
              }
              await  this.LoadingObj.dismiss();
          }
        );
  }
  ViewPrescription(img) {
    console.log(img);
    this.photoViewer.show(img[0]);
  }

  Addtocart() {
    const obj = {
      productid :  this.CurrentProduct.product_id,
      attributeid : this.CurrentProduct.attributes_ids,
      attributeidvalue :  this.SelectedPrice.attibute,
      userid : 10,
      quantity : this.count
      };

    const formData = new FormData();
    formData.append('productid', this.CurrentProduct.product_id);
    formData.append('attributeid', this.CurrentProduct.attributes_ids);
    formData.append('attributeidvalue', this.SelectedPrice.attibute);
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
              }
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
}
