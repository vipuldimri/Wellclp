import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from './filter/filter/filter.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {
  @ViewChild(IonInfiniteScroll , {static: false}) infiniteScroll: IonInfiniteScroll;
  ProductList = [];
  Title;
  StartIndex = 0;
  TotalCount = 100;
  CategoryID;
  Option;
  ShowLoading =  true;
  TotalCountDisplay = '';

  Order = 'NONE';

  Brandids = '';
  Brands = [];
  Subcat = [];
  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController) { }

  ngOnInit() {
     this.route.params.subscribe(
       (RES: any) => {
        const id =  RES.id;
        this.Brands = [];
        const option =  this.route.snapshot.queryParams.option;
        console.log(id);
        console.log(option);
        this.ShowLoading =  true;
        this.StartIndex = 0;
        this.CategoryID = id;
        this.Option =  option;
        this.GetList(id , option , this.StartIndex);
       }
     );


  }

  GetList(id , option , startindex) {
    this.ShowLoading =  true;
    this.TotalCount = 1000;
    this.productS.GetProductList(id, option , startindex , this.Brandids , this.Order)
    .subscribe(
      (Data: any) => {
         console.log(Data);
         this.ProductList =  Data.Products;

         this.Subcat = Data.Sub_cat;

         // tslint:disable-next-line:triple-equals
         if (this.Option == 1) {
          this.Title =  'Results for ' +  this.CategoryID;
        } else {
          this.Title =  Data.Title;
         }
         this.TotalCount = Data.Total_Count;
         this.TotalCountDisplay = Data.Total_Count + ' items';
         this.StartIndex += 20;
         this.ShowLoading =  false;
      } ,
      (error) => {
        this.ShowLoading =  false;
        console.log(error);
        alert('Something went wrong.');
      }
    );
  }
  product(id) {
    this.router.navigate(['main/product-detail' , id] );
  }

  loadData(event) {
    console.log(this.ProductList.length);
    console.log(this.TotalCount);
    if (this.ProductList.length < this.TotalCount) {
      this.productS.GetProductList(this.CategoryID, this.Option , this.StartIndex  , this.Brandids , this.Order)
      .subscribe(
        (Data: any) => {
           console.log(Data);
           const pro  =  Data.Products;
           pro.forEach(element => {
            this.ProductList.push(element);
           });
           // tslint:disable-next-line:triple-equals
           if (this.Option == 1) {
            this.Title =  'Results for ' +  this.CategoryID;
           } else {
            this.Title =  Data.Title;
           }
           this.TotalCount = Data.Total_Count;
           this.StartIndex += 20;
           event.target.complete();
        }
      );
    } else {
      this.infiniteScroll.disabled = true;
      event.target.complete();
    }

  }

  async sortActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort',
      buttons: [
        {
          text: 'Price: Best Sellers first',
          role: 'destructive',
          icon: 'cart-outline',
          handler: () => {
            this.Order = 'NONE';
            this.StartIndex = 0;
            this.infiniteScroll.disabled = false;
            this.GetList(this.CategoryID , this.Option , this.StartIndex);
          }
        }, {
        text: 'Price: Low To High',
        role: 'destructive',
        icon: 'arrow-up',
        handler: () => {
          this.Order = 'ASC';
          this.StartIndex = 0;
          this.infiniteScroll.disabled = false;
          this.GetList(this.CategoryID , this.Option , this.StartIndex);
        }
      }, {
        text: 'Price: High To Low',
        icon: 'arrow-down',
        handler: () => {
          this.Order = 'DESC';
          this.StartIndex = 0;
          this.infiniteScroll.disabled = false;
          this.GetList(this.CategoryID , this.Option , this.StartIndex);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      componentProps: {
        catid: this.CategoryID,
        Brands: this.Brands,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data.apply) {
      const brands =  data.Brands;
      this.Brands =  brands;
      this.Brandids = '';
      brands.forEach(element => {
            if (this.Brandids === '') {
              this.Brandids  =  element.id;
            } else {
              this.Brandids  =  this.Brandids +  ' , ' +  element.id;
            }
      });
      console.log(this.Brandids);
      this.StartIndex = 0;
      this.infiniteScroll.disabled = false;
      this.GetList(this.CategoryID , this.Option , this.StartIndex);
    }
  }

  NevigatetoSubcat(cat) {
    this.router
    .navigate( ['main/products-list', cat.category_id ] , { queryParams: { option: '0'} ,
     queryParamsHandling: 'merge' }  );
  }
}
