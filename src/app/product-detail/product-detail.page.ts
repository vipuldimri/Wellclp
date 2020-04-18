import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonProviderService } from '../services/CommonProvider.service';
import { LoadingController } from '@ionic/angular';
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
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 15,
    centeredSlides: false
  };
  LoadingObj;
  constructor(private ProductS: ProductService,
              private photoViewer: PhotoViewer,
              private route: ActivatedRoute,
              private router: Router,
              private cartS: CartService,
              private socialSharing: SocialSharing,
              private commonP: CommonProviderService,
              public loadingController: LoadingController) { }
  ngOnInit() {

    this.route.params.subscribe(params => {
        const id = params.id;
        // const id =  this.route.snapshot.params.id;
        this.GetProductData(id);

    });

    this.CartCount =  this.cartS.GetCount();
    this.cartS.cartCountsubject.subscribe(
      (data: number) => {
        this.CartCount =  data;
      }
    );
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
              }
              await  this.LoadingObj.dismiss();
          }
        );
  }
  ViewPrescription(img) {
    this.photoViewer.show(img);
  }

  Addtocart() {
    const obj = {
      productid :  this.CurrentProduct.product_id,
      attributeid : this.CurrentProduct.attributes_ids,
      attributeidvalue :  this.SelectedPrice.attibute,
      userid : 10,
      quantity : this.count
      };

    this.cartS.AddProduct(obj)
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
