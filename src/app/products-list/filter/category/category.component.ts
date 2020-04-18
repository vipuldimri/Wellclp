import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  constructor(public modalController: ModalController) { }
  data = [
    {
      category: 'PC',
      subs: [
        {
          subcategory: 'Processor',
          manufactures: [
            {
              manufacture: 'Intel'
            },
            {
              manufacture: 'AMD'
            }
          ]
        },
        {
          subcategory: 'Motherboard',
          manufactures: [
            {
              manufacture: 'Asus'
            },
            {
              manufacture: 'AMD'
            },
            {
              manufacture: 'GigaByte'
            },
            {
              manufacture: 'Intel'
            }
          ]
        },
        {
          subcategory: 'Memory',
          manufactures: [
            {
              manufacture: 'Visipro'
            },
            {
              manufacture: 'Crucial'
            },
            {
              manufacture: 'VenomRX'
            }
          ]
        }
      ]
    },
    {
      category: 'Laptop',
      subs: [
        {
          subcategory: 'Notebook',
          manufactures: [
            {
              manufacture: 'Lenovo'
            },
            {
              manufacture: 'Dell'
            }
          ]
        }
      ]
    }
  ];
  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
