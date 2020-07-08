import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { User } from 'src/app/services/auth/user.model';
import { LoadingController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit , OnDestroy {


  OrderData ;
  ShowOrder =  false;
  BackButtonSub: Subscription;
  AllowBack = true;
  constructor(   private route: ActivatedRoute,
                 private router: Router ,
                 private pService: ProductService,
                 private AuthS: AuthService,
                 public loadingController: LoadingController) { }
  LoadingObj;
  LogedInUser: User;
  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();

    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
      if (!this.AllowBack) {
        this.router.navigate(['main']);
      }
    });

    this.route.params.subscribe(params => {
      const id = params.orderID;
      // const id =  this.route.snapshot.params.id;
      this.GetOrderdata(this.LogedInUser.UserId , id);
  });



    this.route.queryParams.subscribe(
      (data: any) => {
          this.AllowBack = data.allowback;
      }
    );

  }

  async GetOrderdata(userid , orderid) {
    this.ShowOrder =  false;
    await this.presentLoading();
    this.pService.GetOrderData(userid , orderid)
      .subscribe(
        async (data: any) => {
          console.log(data);
          this.OrderData =  data.data;
          await  this.LoadingObj.dismiss();
          this.ShowOrder =  true;
        } ,
        async (error) => {
          await  this.LoadingObj.dismiss();
          alert('Something went wrong');
        }
      );
  }


  async presentLoading() {
    this.LoadingObj = await this.loadingController.create({
      message: 'Please wait...'
    });
    await  this.LoadingObj.present();
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

  GetPaymentstatus(status) {
    if (status === '1') {
      return 'Successfull Transaction';
    } else if (status === '2') {
      return 'Failed Transaction' ;
    } else {
     return 'Pending';
    }

  }

  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }


}
