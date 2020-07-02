import { Component, OnInit } from '@angular/core';
import { CommonProviderService } from '../services/CommonProvider.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  LogedInUser: User;
  NotiList = [];
  Refresher;
  constructor(private commS: CommonProviderService,
              private router: Router,
              private AuthS: AuthService) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetMyNotifications();
  }

  GetMyNotifications() {
          this.commS.GetMyNotifications(10)
          .subscribe(
              (Data: any) => {

                      if (this.Refresher) {
                        this.Refresher.target.complete();
                      }
                      if (Data.Status) {
                            this.NotiList =  Data.data;
                            console.log(this.NotiList);
                      }
              } ,
               () => {
                if (this.Refresher) {
                  this.Refresher.target.complete();
                }
               }
          );
  }
  NavigateToNoti(item) {
      if (item && item.Belongs && item.Parent_ID) {
        if (item.Belongs === '1') {
             this.Nevigatetocategory(item.Parent_ID);
        } else if (item.Belongs === '2') {
          this.Nevigatetoproduct(item.Parent_ID);
        }

      }
  }


  Nevigatetoproduct(ID) {
    this.router.navigate(['main/product-detail', ID] ,
);
  }

  Nevigatetocategory(catid) {
    this.router
    .navigate( ['main/products-list', catid ] , { queryParams: { option: '0'} ,
     queryParamsHandling: 'merge' }  );
  }


  doRefresh($event) {
    console.log('Begin async operation');


    this.GetMyNotifications();
    this.Refresher =  event;
  }

}
