import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  LoginUser: User;
  constructor(private AuthS: AuthService) { }

  ngOnInit() {

    this.LoginUser =  this.AuthS.GetLoginUser();
    console.log(this.LoginUser);
  }

}
