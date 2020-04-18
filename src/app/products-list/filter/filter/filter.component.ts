import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { SearchComponent } from '../search/search.component';
import { CategoryComponent } from '../category/category.component';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  SelectedBrands = [];
  SelectedPTypes = [];
  BrandsText = 'Select Brand';
  TypeText = 'Select Form';
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  async presentSearchModal(value) {


    if (value === 0) {
      const modal = await this.modalController.create({
        component: SearchComponent,
        componentProps: {
          Type: value,
          PrevSelectedItems: this.SelectedBrands
        }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      console.log(data);
      console.log('here');

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
}
