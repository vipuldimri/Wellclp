import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  BackButtonSub: Subscription;
  @Input() Message: string;
  constructor(private router: Router, public modalController: ModalController) { }

  ngOnInit() {

    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });


  }

  Dismiss() {
    this.ctyShopping();
  }

  async ctyShopping() {
    this.BackButtonSub.unsubscribe();
    await this.modalController.dismiss();
    this.router.navigate(['main']);
  }

}
