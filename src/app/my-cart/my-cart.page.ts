import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';
import { LocationService } from '../services/location/location.service';
import { ModalController, AlertController } from '@ionic/angular';
import { SelectAddressComponent } from '../location/select-address/select-address.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  LogedInUser: User;
  CartProducts = [];
  TotalPrice = 0;
  Refresher;
  AddressList = [];
  SelectedAddress;
  ShowCart =  false;
  constructor(private cartS: CartService, private locationS: LocationService,
              private router: Router, public alertController: AlertController,
              private AuthS: AuthService, public modalController: ModalController) { }

  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 5,
    centeredSlides: false
  };

  ngOnInit() {
    // this.CartProducts =   this.cartS.GetProducts();
    // console.log(this.CartProducts);
    this.LogedInUser = this.AuthS.GetLoginUser();
    // this.LogedInUser.UserId = 10;
    this.RefreshCart(null);
    this.GetMyAddress();
  }

  RemoveItem(tempid) {
     const Cobj = { userid : 10 , isDelete : true , d_id : tempid };

     const formData = new FormData();
     formData.append('userid', 10 + '');
     formData.append('isDelete', 'true');
     formData.append('d_id',  tempid );
     formData.append('mode',  'removeitem' );
     this.cartS.GetCart(formData)
     .subscribe(
       (Data: any) => {
         console.log(Data);
         this.CartProducts = Data.data;
         this.TotalPrice = Data.total;
       }
     );
  }

  RefreshCart(event) {
    const Cobj = { userid : 10 , isDelete : false , d_id : -1 };

    const formData = new FormData();
    formData.append('userid', 10 + '');
    formData.append('isDelete', 'false');
    formData.append('d_id',  '-1' );
    formData.append('mode',  'refresh' );
    this.Refresher =  event;

    this.cartS.GetCart(formData)
    .subscribe(
      (Data: any) => {

        if (this.Refresher) {
          this.Refresher.target.complete();
        }
        console.log(Data);
        this.CartProducts = Data.data;
        this.TotalPrice = Data.total;
      }
    );
  }

  GetMyAddress() {
    this.locationS.GetUserAddresses(10)
    .subscribe(
      (Data: any) => {
        console.log(Data);
        this.AddressList =  Data.data;
        if (this.AddressList.length === 0) {

        } else {
          this.SelectedAddress  =  this.AddressList[0];
        }
        this.ShowCart =  true;
        }
    );
}

GetAddressType(ID) {
    if (ID === '1') {
        return 'Home';
    } else if (ID === '2') {
      return 'Office';
    } else if (ID === '0') {
      return 'Other';
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

async CheckoutButton(EditAddress) {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmation',
    message: 'Final payable amount : &#x20b9; ' + this.GetFinalPrice(this.TotalPrice),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Place order',
        handler: () => {
          this.CheckOut();
        }
      }
    ]
  });

  await alert.present();
}

CheckOut() {

  if (!this.SelectedAddress || !this.AddressList || this.AddressList.length === 0) {
    alert('Please select address first');
    return;
  }
  const formData = new FormData();
  formData.append('user_id', 10 + '');
  formData.append('address_type_pass', this.SelectedAddress.address_type);
  formData.append('address_id',  this.SelectedAddress.id );


  this.cartS.Placeorder(formData)
  .subscribe(
    (Data: any) => {
      console.log(Data);
      if (Data.Status) {
          alert('Order placed successfully');
          this.CartProducts = [];
          this.router
          .navigate(
            [ 'main' , 'my-orders' , Data.OrderId] ,
            { queryParams: { allowback : false } } ) ;
      } else {
        alert(Data.Mess);
      }
    },
    (Error) => {
      alert('Something went wrong');
    }
  );
}

  async SelectAddress() {

    let id = 0;

    if (this.SelectedAddress) {
      id = this.SelectedAddress.id;
    }

    const modal = await this.modalController.create({
    component: SelectAddressComponent,
    componentProps: {
      SelectedAddress : id
    }
  });
    await modal.present();
    console.log('NIKL GYA');
    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data.list) {
        this.AddressList =  data.list;
    }

    if (data.id) {
      this.SelectedAddress =  this.AddressList.find(x => x.id === data.id);
    }

}
ctyShopping() {
  this.router.navigate(['main']);
}

GetFinalPrice(price) {
      if (this.SelectedAddress) {
          return +price +  +this.SelectedAddress.country_id;
      } else {
        return price;
      }
}

changeQuantity(tempid , qty , mode) {

  let oldQTY = +qty;

  if (mode === 'ADD') {
    oldQTY = oldQTY + 1;
  } else {
    oldQTY = oldQTY - 1;
  }

  if (oldQTY <= 0) {
     return;
  }

  const formData = new FormData();
  formData.append('userid', 10 + '');
  formData.append('isDelete', 'false');
  formData.append('d_id',  '-1' );
  formData.append('d_id',  '-1' );
  formData.append('temp_id', tempid);
  formData.append('qty',  oldQTY + '');
  formData.append('mode', 'updateQTY');

  this.cartS.GetCart(formData)
  .subscribe(
    (Data: any) => {
      console.log(Data);

      if (Data.Status) {
        this.CartProducts = Data.data;
        this.TotalPrice = Data.total;
      } else {
        alert(Data.Mess);
      }

    }
  );
}

}
