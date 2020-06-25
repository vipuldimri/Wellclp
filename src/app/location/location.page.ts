import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location/location.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
import { Platform, ModalController } from '@ionic/angular';
import { AddAddressComponent } from './add-address/add-address.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 5,
    centeredSlides: false
  };
  AddressList = [];
  LogedInUser: User;
  cardWidth;
  constructor(private locationS: LocationService,  private platform: Platform,
              public modalController: ModalController,
              private AuthS: AuthService) { }

  ngOnInit() {
    this.platform.ready().then((readySource) => {
      // console.log('Width: ' + platform.width());
      const k =  (this.platform.height() * 22 ) / 100;
      console.log(k);
      console.log('Height: ' + this.platform.height());
      console.log('Width: ' + this.platform.width());
      this.cardWidth =  (this.platform.width() * 80) / 100;
    });

    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetMyAddress();
  }

  GetMyLocation() {
        this.locationS.GetLocation();
  }

  GetMyAddress() {
      this.locationS.GetUserAddresses(this.LogedInUser.UserId)
      .subscribe(
        (Data: any) => {
          console.log(Data);
          this.AddressList =  Data.data;
          }
      );
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
      this.GetMyAddress();
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

  GetAddressIcon(ID) {
    if (ID === '1') {
        return 'assets/icon/home.svg';
    } else if (ID === '2') {
      return 'assets/icon/office.svg';
    } else if (ID === '0') {
      return 'assets/icon/other.svg';
    } else {
      return 'assets/icon/other.svg';
    }
  }

}
