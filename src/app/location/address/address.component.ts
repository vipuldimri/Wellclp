import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { ModalController } from '@ionic/angular';
import { AddAddressComponent } from '../add-address/add-address.component';
import { User } from 'src/app/services/auth/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  Address = [];
  LogedInUser: User;
  constructor(private locaS: LocationService,
              private AuthS: AuthService,
              public modalController: ModalController) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetMyLocation();
  }

  GetMyLocation() {
        this.locaS.GetUserAddresses( this.LogedInUser.UserId)
        .subscribe(
          (Data: any) => {
            console.log(Data.data);
            this.Address =  Data.data;
          }
        );
  }

  async NewAddress() {
    const modal = await this.modalController.create({
      component: AddAddressComponent
    });
    return await modal.present();
  }

}
