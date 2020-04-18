import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  LogedInUser: User;
  CartProducts = [];
  TotalPrice = 0;
  constructor(private cartS: CartService,
              private AuthS: AuthService) { }

  ngOnInit() {
    // this.CartProducts =   this.cartS.GetProducts();
    // console.log(this.CartProducts);
    this.LogedInUser = this.AuthS.GetLoginUser();
    this.RefreshCart();

  }

  RemoveItem(tempid) {
     const Cobj = { userid : this.LogedInUser.UserId , isDelete : true , d_id : tempid };
     this.cartS.GetCart(Cobj)
     .subscribe(
       (Data: any) => {
         console.log(Data);
         this.CartProducts = Data.data;
         this.TotalPrice = Data.total;
       }
     );
  }

  RefreshCart() {
    const Cobj = { userid : this.LogedInUser.UserId , isDelete : false , d_id : -1 };

    const formData = new FormData();
    formData.append('userid', 'this.LogedInUser.UserId');
    formData.append('isDelete', 'false');
    formData.append('d_id',  '-1' );


    this.cartS.GetCart(formData)
    .subscribe(
      (Data: any) => {
        console.log(Data);
        this.CartProducts = Data.data;
        this.TotalPrice = Data.total;
      }
    );
  }
}
