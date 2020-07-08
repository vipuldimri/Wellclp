import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router,
              private nativeStorage: NativeStorage,
              private AuthS: AuthService) {}
   async canActivate() {
       const result = await this.checkUser();
        // alert(result);
       if (!result) {
        this.router.navigate(['intro-slides']);
        return false;
        // return true;
       } else {
        return true;
       }
  }
  async checkUser() {
    try {
        // return true;
        const item  = await  this.nativeStorage.getItem('user');
        const user =  new User();
        user.UserId =  item.UserId;
        user.Email =  item.Email;
        user.Contact =  item.Contact;
        user.Name =  item.Name;
        user.Image =  item.Image;
        console.log('found');
        console.log(item);
        console.log(user);
        this.AuthS.SaveLoginUser(user);
        return true;
    } catch (error) {
            console.log('ERROR');
            return false;
    }
  }
}
