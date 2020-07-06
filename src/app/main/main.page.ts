import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';
import { CommonProviderService } from '../services/CommonProvider.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  LoginUser: User;
  constructor(private AuthS: AuthService,
              private commonProviderService: CommonProviderService) { }

  ngOnInit() {

    this.LoginUser =  this.AuthS.GetLoginUser();
    console.log(this.LoginUser);
  }

  ionViewWillLeave() {
    // alert('removing from main');
    this.commonProviderService.RemoveUnSubcribeBack();
  }

  ionViewWillEnter() {
    // alert('Event attached main');
    const event = fromEvent(document, 'backbutton');
    const obj  = event.subscribe(async () => {
             // tslint:disable-next-line:no-string-literal
             navigator['app'].exitApp();
    });

    this.commonProviderService.AddSubcribeBack(obj);
  }

  // ionViewDidLeave() {
  //   alert('ionViewDidLeave');
  // }

}
