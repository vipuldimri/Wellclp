import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { ModalController } from '@ionic/angular';
import { AddAddressComponent } from '../add-address/add-address.component';
import { User } from 'src/app/services/auth/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { CommonProviderService } from 'src/app/services/CommonProvider.service';
@Component({
  selector: 'app-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss'],
})
export class SelectAddressComponent implements OnInit , OnDestroy {


  Address = [];
  LogedInUser: User;
  BackButtonSub: Subscription;
  constructor(private locaS: LocationService,
              private AuthS: AuthService,
              private CommonProviderS: CommonProviderService,
              public alertController: AlertController,
              public modalController: ModalController) { }


  @Input() SelectedAddress;

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetMyLocation();
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });
  }

  GetMyLocation() {
        this.locaS.GetUserAddresses(this.LogedInUser.UserId)
        .subscribe(
          (Data: any) => {
            console.log(Data.data);
            this.Address =  Data.data;
          }
        );
  }
  Dismiss() {
    console.log(this.SelectedAddress);
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss({
      list: this.Address
    });
}
  async NewAddress() {
    const modal = await this.modalController.create({
      component: AddAddressComponent,
      componentProps: {
        IsEditMode : false
      }
    });
    await modal.present();
    console.log('NIKL GYA');
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data.refresh) {
        this.GetMyLocation();
    }
  }

  async EditAddress(Oldaddress) {
    const modal = await this.modalController.create({
      component: AddAddressComponent,
      componentProps: {
        IsEditMode : true,
        EditAddress : Oldaddress
      }
    });
    await modal.present();
    console.log('NIKL GYA');
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data.refresh) {
        this.GetMyLocation();
    }
  }

  async Delete(EditAddress) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete address ? ',
      message: 'Are you sure you want to delete this address.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'DELETE',
          cssClass: 'danger',
          handler: () => {
            const formData = new FormData();

            formData.append('mode', 'DELETE');
            formData.append('user_id', '10');
            formData.append('AddressID', EditAddress.id);
            this.locaS.AddAddress(formData).subscribe(
              (Res: any) => {
                this.GetMyLocation();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }


  DeliverHere() {
    if (!this.SelectedAddress) {

      this.CommonProviderS.presentToast('Please select atleast one address.');
      return;
    }


    this.modalController.dismiss({
        id: this.SelectedAddress,
        list: this.Address
    });
  }

  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }

}
