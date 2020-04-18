import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private LoginUser: User;
 constructor(private http: HttpClient) { }

login(userphone, userpassword) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('phone', userphone);
  formData.append('password', userpassword);

  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/login.php',
  formData );

  // return this.http.post('http://mob-api.wellclap.com/login.php',
  // formData );

  // return this.http.post('http://mob-api.wellclap.com/login.php',
  // {phone : userphone , password : userpassword } , httpOptions );
}

SaveToken(userid ,  Token) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  // return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/savetoken.php',
  //   { user_id: userid, token: Token } , httpOptions
  // );
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

