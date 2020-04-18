import { Component, OnInit } from '@angular/core';
import { CommonProviderService } from '../services/CommonProvider.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  LogedInUser: User;
  NotiList = [];
  constructor(private commS: CommonProviderService,
              private AuthS: AuthService) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
    this.GetMyNotifications();
  }

  GetMyNotifications() {
          this.commS.GetMyNotifications(this.LogedInUser.UserId)
          .subscribe(
              (Data: any) => {
                      if (Data.Status) {
                            this.NotiList =  Data.data;
                      }
              }
          );
  }
}
