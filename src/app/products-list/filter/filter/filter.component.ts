import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { SearchComponent } from '../search/search.component';
import { CategoryComponent } from '../category/category.component';
import { fromEvent, Subscription } from 'rxjs';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit , OnDestroy {

  @Input() catid;
  @Input() Brands;
  SelectedBrands = [];
  SelectedPTypes = [];
  BrandsText = 'Select Brand';
  TypeText = 'Select Form';
  BackButtonSub: Subscription;
  constructor(public modalController: ModalController) { }

  ngOnInit() {


    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.dismiss();
    });


    if (this.Brands.length > 0) {
    this.BrandsText =  '';
    }
    let count = 0;
    this.Brands.forEach(element => {
        if (count === 0) {
          this.BrandsText =     element.title;
        } else {
          this.BrandsText =     this.BrandsText +  ',' + element.title;
        }
        count =  count + 1;
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      apply: false,
      Brands: this.SelectedBrands
    });
  }
  async presentSearchModal(value) {


    if (value === 0) {
      const modal = await this.modalController.create({
        component: SearchComponent,
        componentProps: {
          Type: value,
          catid: this.catid,
          Brands: this.Brands,
          PrevSelectedItems: this.SelectedBrands
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      console.log(data);
      console.log('here');

      let selectedBrand = [];
      if (data.selectedItems) {
        selectedBrand = data.selectedItems;
        this.SelectedBrands =  selectedBrand;
      }
      console.log(selectedBrand);

      if (data.type === 0) {
            this.BrandsText = data.title;
      } else {
            this.TypeText = data.title;
      }




    } else {
      const modal = await this.modalController.create({
        component: SearchComponent,
        componentProps: {
          Type: value,
          PrevSelectedItems: this.SelectedPTypes
        }
      });

      await modal.present();
      const { data } = await modal.onWillDismiss();
      console.log(data);
      console.log('here');

      if (data.type === 0) {
            if (data.title && data.title !== '') {
              this.BrandsText = data.title;

            }
      } else {
            if (data.title && data.title !== '') {
              this.TypeText = data.title;
            }
      }


    }

  }

  async presentCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryComponent
    });
    await modal.present();

  }

  ApplyFilter() {
    this.modalController.dismiss({
      dismissed: true,
      apply: true,
      Brands: this.SelectedBrands
    });
  }

  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }
}
