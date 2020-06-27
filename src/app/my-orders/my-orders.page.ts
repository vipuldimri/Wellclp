import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  Orders = [];
  LogedInUser: User;
  constructor(private pService: ProductService , private AuthS: AuthService) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetOrders(this.LogedInUser.UserId);
  }

  GetOrders(userid) {
      this.pService.GetMyOrders(userid)
      .subscribe(
        (Data: any) => {
              console.log(Data);
              if (Data.Status) {
                  this.Orders =  Data.data;
              }
        }
      );
  }


  GetOrderStatus(orderstatus) {
    if (orderstatus === '0') {
      return 'Under Process';
    } else if (orderstatus === '1') {
      return 'Completed' ;
    } else if (orderstatus === '2') {
     return 'Shipped';
    } else if (orderstatus === '3') {
      return   'Return' ;
    }
  }

  GetPaymentmode(paymentmethod) {
    if (paymentmethod === '1') {
      return 'Paypal';
    } else if (paymentmethod === '2') {
      return 'Debit / Credit Card' ;
    } else if (paymentmethod === '3') {
     return 'Cash On Delivery';
    } else if (paymentmethod === '4') {
      return   'Return' ;
    }
  }

}
