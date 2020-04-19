import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { Sim } from '@ionic-native/sim/ngx';
import { OTPComponent } from '../otp/otp.component';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss'],
})
export class PhonenumberComponent implements OnInit, OnDestroy {
  BackButtonSub: Subscription;
  PhoneNo;
  constructor(public modalController: ModalController ,
              private sim: Sim) { }

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });

    this.GetPhoneNo();
  }

  GetPhoneNo() {
    this.sim.hasReadPermission().then(
      (info) => {
              if (info) {
                this.sim.getSimInfo().then(
                  (Siminfo) => {
                    if (Siminfo.phoneNumber && Siminfo.phoneNumber.length >= 10) {
                      this.PhoneNo =  Siminfo.phoneNumber.substring(2);
                    }
                  },
                  (err) => console.log('Unable to get sim info: ', err)
                );
              } else {
                this.sim.requestReadPermission().then(
                  () => {
                    this.sim.getSimInfo().then(
                      (Siminfo) => {
                        if (Siminfo.phoneNumber && Siminfo.phoneNumber.length >= 10) {
                          this.PhoneNo =  Siminfo.phoneNumber.substring(2);
                        }
                      },
                      (err) => console.log('Unable to get sim info: ', err)
                    );
                  },
                  () => console.log('Permission denied')
                );
              }
      }
    );



  }

  Dismiss() {
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }
 ngOnDestroy(): void {
  this.BackButtonSub.unsubscribe();
}

  async OTP() {
    const modal = await this.modalController.create({
      component: OTPComponent
    });
    return await modal.present();
  }

}
