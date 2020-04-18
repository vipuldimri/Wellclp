import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() Type: number;
  @Input() PrevSelectedItems;
  Title = '';
  List = [];
  SelectedItems = [];
  constructor(public modalController: ModalController , private proS: ProductService) { }
 // Data passed in by componentProps
  ngOnInit() {

    if (this.Type === 0) {
          this.Title =  'Brands';
          this.GetProductBrands();
    } else {
         this.Title =  'Product Form';
         this.GetProductTypes();
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  GetProductTypes() {
      this.proS.GetProductTypes()
      .subscribe(
        (Data: any) => {
          if (Data.Status) {
              this.List =  Data.data;
              this.List.forEach(element => {
                element.Ischecked = false;
                element.Show = true;
              });
              console.log(this.List);
             }
        }
      );
  }

  GetProductBrands() {
    this.proS.GetProductBrands()
    .subscribe(
      (Data: any) => {
        if (Data.Status) {
            this.List =  Data.data;
            this.List.forEach(element => {
              element.Ischecked = false;
              element.Show = true;
            });
            console.log(this.List);
           }
      }
    );
  }

  SearchEvent(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.List.forEach(item => {
        const shouldShow = item.title.toLowerCase().indexOf(query) > -1;
        if (shouldShow) {
          item.Show = true;
        } else {
          item.Show = false;
        }
      });
    });
  }

  ClearALL() {
        this.List.forEach(element => {
          element.Ischecked =  false;
        });
  }

  Apply() {
        let text = '';
        this.List.forEach(element => {
           if (element.Ischecked) {
            this.SelectedItems.push(element);
            if (text === '') {
              text = element.title ;
            } else {
              text = text + ',' + element.title;
            }
           }
        });

        this.modalController.dismiss({
          selectedItems : this.SelectedItems,
          title: text,
          type: this.Type
        });
  }

}
