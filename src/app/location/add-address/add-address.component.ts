import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonProviderService } from 'src/app/services/CommonProvider.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit, OnDestroy {

  @Input() EditAddress;
  @Input() IsEditMode: boolean;

  Addressform: FormGroup;

  BackButtonSub: Subscription;
  LogedInUser: User;
  constructor(public modalController: ModalController,
              private AuthS: AuthService,
              private locaS: LocationService,
              private CommonProviderS: CommonProviderService,
              private platform: Platform) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });



    if (this.EditAddress) {
      this.Addressform = new FormGroup(
        {
          Name : new FormControl(this.EditAddress.name , [ Validators.required]),
          Mobile : new FormControl(this.EditAddress.phone, [ Validators.required , Validators.maxLength(10) , Validators.minLength(10)
            , Validators.pattern('^[0-9]*$') ]),
          Pincode : new FormControl(this.EditAddress.pincode, [ Validators.required , Validators.maxLength(6) , Validators.minLength(6)
            , Validators.pattern('^[0-9]*$') ]),
          Address: new FormControl(this.EditAddress.address, [ Validators.required]),
          AddressType: new FormControl(this.EditAddress.address_type, [ Validators.required]),
          State: new FormControl(this.EditAddress.state_id_name, [ Validators.required]),
          City: new FormControl(this.EditAddress.city_id_name, [ Validators.required]),
          Place: new FormControl(this.EditAddress.place, [ Validators.required]),
          LandMark: new FormControl(this.EditAddress.landmark, [ Validators.required]),
        }
      );
    } else  {
      this.Addressform = new FormGroup(
        {
          Name : new FormControl(null , [ Validators.required]),
          Mobile : new FormControl(null, [ Validators.required , Validators.maxLength(10) , Validators.minLength(10)
            , Validators.pattern('^[0-9]*$') ]),
          Pincode : new FormControl(null, [ Validators.required , Validators.maxLength(6) , Validators.minLength(6)
            , Validators.pattern('^[0-9]*$') ]),
          Address: new FormControl(null, [ Validators.required]),
          AddressType: new FormControl(null, [ Validators.required]),
          State: new FormControl(null, [ Validators.required]),
          City: new FormControl(null, [ Validators.required]),
          Place: new FormControl(null, [ Validators.required]),
          LandMark: new FormControl(null, [ Validators.required]),
        }
      );
    }
    console.log(this.EditAddress);

  }

  Dismiss() {
      this.BackButtonSub.unsubscribe();
      this.modalController.dismiss({
        refresh: false
      });
  }
  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }

  Save() {

  }

  Submit() {
    console.log(this.Addressform);
    if (this.Addressform.status === 'INVALID') {
      this.CommonProviderS.presentToast('Please provide all details');
      return;
    }

    if (this.IsEditMode) {
      this.Edit();
    } else {
      this.Add();
    }


  }


  Add() {
    console.log(this.Addressform);
    if (this.Addressform.status === 'INVALID') {
      this.CommonProviderS.presentToast('Please provide all details');
      return;
    }


    const formData = new FormData();
    formData.append('Name', this.Addressform.value.Name);
    formData.append('Mobile', this.Addressform.value.Mobile);
    formData.append('Pincode', this.Addressform.value.Pincode);
    formData.append('Address', this.Addressform.value.Address);
    formData.append('AddressType', this.Addressform.value.AddressType);
    formData.append('State', this.Addressform.value.State);
    formData.append('City', this.Addressform.value.City);
    formData.append('Place', this.Addressform.value.Place);
    formData.append('LandMark', this.Addressform.value.LandMark);
    formData.append('LandMark', this.Addressform.value.LandMark);
    formData.append('mode', 'ADD');

    formData.append('user_id', '10');


    this.locaS.AddAddress(formData).subscribe(
      (Res: any) => {
        console.log(Res);
        if (Res.Status) {
          // all good
          this.modalController.dismiss({
            refresh: true
          });
        }
      }
    );
  }


  Edit() {
    console.log(this.Addressform);
    if (this.Addressform.status === 'INVALID') {
      this.CommonProviderS.presentToast('Please provide all details');
      return;
    }


    const formData = new FormData();
    formData.append('Name', this.Addressform.value.Name);
    formData.append('Mobile', this.Addressform.value.Mobile);
    formData.append('Pincode', this.Addressform.value.Pincode);
    formData.append('Address', this.Addressform.value.Address);
    formData.append('AddressType', this.Addressform.value.AddressType);
    formData.append('State', this.Addressform.value.State);
    formData.append('City', this.Addressform.value.City);
    formData.append('Place', this.Addressform.value.Place);
    formData.append('LandMark', this.Addressform.value.LandMark);
    formData.append('LandMark', this.Addressform.value.LandMark);
    formData.append('mode', 'EDIT');

    formData.append('user_id', '10');
    formData.append('AddressID', this.EditAddress.id);

    this.locaS.AddAddress(formData).subscribe(
      (Res: any) => {
        console.log(Res);
        if (Res.Status) {
          // all good
          this.modalController.dismiss({
            refresh: true
          });
        }
      }
    );
  }


}
