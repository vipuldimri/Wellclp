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
login(userphone) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('phone', userphone);



  return this.http.post(this.baseURL +  '/api/auth/loginPhone.php' , formData);

}

loginPassword(userphone  , password) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('phone', userphone);
  formData.append('password', password);



  return this.http.post(this.baseURL +  '/api/auth/login.php' , formData);

}

Googlelogin(email) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };

  const formData = new FormData();
  formData.append('email', email);

  return this.http.post(this.baseURL + '/api/auth/checkgoogle.php',
  formData );
}

GoogleRegisteration(Fromobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };


  return this.http.post( this.baseURL + '/api/auth/googleregister.php',
  Fromobj );
}

SendOTP(Fromobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })

  };


  return this.http.post(this.baseURL + '/api/auth/sendregisterationOTP.php',
  Fromobj );
}

SaveToken(userid: string ,  Token: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 // alert(userid);
  const formData = new FormData();
  formData.append('user_id', userid);
  formData.append('token', Token);
  console.log('Before going ');
  console.log(userid);
  console.log(Token);
  return this.http.post(this.baseURL + '/api/auth/savetoken.php',
  formData
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



SignUp(Obj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post(this.baseURL +  '/api/auth/signup.php' , Obj);
}

ChangePassword(Obj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post(this.baseURL +  '/api/auth/changepassword.php' , Obj);
}
Forgotpassword(Obj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post(this.baseURL +  '/api/auth/forgotpassword.php' , Obj);
}

}
