import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private LoginUser: User;
 constructor(private http: HttpClient) { }
// constructor(private http: HTTP, private oldhttp: HttpClient) {}
 baseURL = environment.baseURL;
 // http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/login.php
login(userphone, userpassword) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('phone', userphone);
  formData.append('password', userpassword);

  return this.http.post(this.baseURL +  '/api/auth/login.php' , formData);
  // return this.http.get(this.baseURL +  '/api/auth/login.php' , {} , { });
  // return this.http.post( this.baseURL +  '/api/auth/login.php',
  // formData );
}

Googlelogin(email) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('email', email);

  return this.http.post(this.baseURL + '/api/auth/googlelogin.php',
  formData , httpOptions);
}

GoogleRegisteration(Fromobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };


  return this.http.post( this.baseURL + '/api/auth/googleregister.php',
  Fromobj , httpOptions);
}

SendOTP(Fromobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };


  return this.http.post(this.baseURL + '/api/auth/sendregisterationOTP.php',
  Fromobj , httpOptions);
}

SaveToken(userid ,  Token) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('user_id', userid);
  formData.append('token', Token);
  return this.http.post(this.baseURL + '/api/auth/savetoken.php',
  formData , httpOptions
  );
}
SaveLoginUser(user: User) {
  this.LoginUser =  user;
}

GetLoginUser(): User {
  return this.LoginUser;
}

Logout() {
  this.login = null;
}
Checklogin() {
  if (!this.login || !this.LoginUser.UserId) {
      return false;
  } else {
    return true;
  }
}

// login(userphone, userpassword) {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json'
//     })
//   };
//   return this.http.post('https://rajasthanpuc.in/avltiteapi/api/Auth/AuthenticateUser',
//     { Contact: userphone, Password: userpassword } , httpOptions
//   );
// }
}

