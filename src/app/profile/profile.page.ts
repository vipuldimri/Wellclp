import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';
import { ModalController } from '@ionic/angular';
import { ChangePasswordComponent } from '../login/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  LogedInUser: User;
  constructor(private nativeStorage: NativeStorage,
              private router: Router,
              private AuthS: AuthService,
              public modalController: ModalController
              ) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
  }

  Signout() {
    this.nativeStorage.clear().then(
      data => {
        this.AuthS.Logout();
        this.router.navigate(['login']);
      },
      error => {
      }
    );
  }


}
