import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user.model';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit, OnDestroy {

  BackButtonSub: Subscription;
  LogedInUser: User;
  constructor(public modalController: ModalController,
              private AuthS: AuthService,
              private platform: Platform) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
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

  Save() {

  }
}
