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
  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController) { }

  ngOnInit() {
     const id =  this.route.snapshot.params.id;
     const option =  this.route.snapshot.queryParams.option;
     console.log(id);
     console.log(option);
     this.CategoryID = id;
     this.Option =  option;

     this.GetList(id , option , this.StartIndex);
  }

  GetList(id , option , startindex) {
    this.productS.GetProductList(id, option , startindex )
    .subscribe(
      (Data: any) => {
         console.log(Data);
         this.ProductList =  Data.Products;

         // tslint:disable-next-line:triple-equals
         if (this.Option == 1) {
          this.Title =  'Results for ' +  this.CategoryID;
        } else {
          this.Title =  Data.Title;
         }
         this.TotalCount = Data.Total_Count;
         this.StartIndex += 20;
         this.ShowLoading =  false;
      } ,
      (error) => {
        this.ShowLoading =  false;
        console.log(error);
      }
    );
  }
  product(id) {
    this.router.navigate(['main/product-detail' , id] );
  }

  loadData(event) {
    if (this.ProductList.length < this.TotalCount) {
      this.productS.GetProductList(this.CategoryID, this.Option , this.StartIndex )
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
      buttons: [{
        text: 'Price: Low To High',
        role: 'destructive',
        icon: 'arrow-up',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Price: High To Low',
        icon: 'arrow-down',
        handler: () => {
          console.log('Share clicked');
        }
      },
      // }, {
      //   text: 'Discount',
      //   icon: 'pricetags',
      //   handler: () => {
      //     console.log('Play clicked');
      //   }
      // },
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
      component: FilterComponent
    });
    return await modal.present();
  }
}
