import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location/location.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 5,
    centeredSlides: false
  };
  AddressList = [];
  LogedInUser: User;
  constructor(private locationS: LocationService,
              private AuthS: AuthService) { }

  ngOnInit() {
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

}
