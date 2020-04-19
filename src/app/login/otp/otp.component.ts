import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent implements OnInit, OnDestroy {
  BackButtonSub: Subscription;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });
  }

  Dismiss() {
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }
 ngOnDestroy(): void {
  this.BackButtonSub.unsubscribe();
}

}
