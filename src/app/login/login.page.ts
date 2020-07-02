import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AlertController, LoadingController, Platform, ModalController } from '@ionic/angular';
import { CommonProviderService } from '../services/CommonProvider.service';
import { User } from '../services/auth/user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Sim } from '@ionic-native/sim/ngx';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,  OnDestroy {

  user: Observable<firebase.User>;

  Phone = '';
  Password = '';
  LoginProgress;
  BackButtonSub: Subscription;
  constructor(private router: Router,
              private fcm: FCM,
              private AuthS: AuthService,
              private common: CommonProviderService,
              public alertController: AlertController,
              private platform: Platform,
              private googlePlus: GooglePlus,
              private afAuth: AngularFireAuth,
              public modalController: ModalController,
              private nativeStorage: NativeStorage) {
                  this.user =  this.afAuth.authState;
              }

  ngOnInit() {
    // const event = fromEvent(document, 'backbutton');
    // this.BackButtonSub = event.subscribe(async () => {
    // });
  }
  GOOGLE() {
    if (this.platform.is('cordova')) {
        this.nativegooglelogin()
        .then(async res => {
          console.log(res.user.email);
          await this.common.loadingPresent('Please wait..');
          this.AuthS.Googlelogin(res.user.email)
          .subscribe(
            async (RES: any) => {
              console.log(RES);
              await this.common.loadingDismiss();
              if (RES.Status) {
                const user =  new User();
                user.UserId =  RES.data.user_id;



                user.Email =  RES.data.email;
                user.Contact =  RES.data.phone_no;
                user.Name =  RES.data.name;
                user.Image =  res.user.photoURL;
                this.AuthS.SaveLoginUser(user);
                this.nativeStorage.setItem('user' , user)
                .then(
                  () => console.log('Stored item!'),
                  error => console.error('Error storing item', error)
                );
                this.saveFirebaseToken(user.UserId);
                this.router.navigate(['main']);
              } else {

                if (RES.Mess === 'Not Registered') {

                  this.SIM(res.user.email , res.user.displayName);

                } else {
                  this.common.presentToast(RES.Mess);
                }
              }
          },
          async (error) => {
            console.log(error);
            console.log(error.headers);
            console.log(error.error);
            await this.common.loadingDismiss();
            this.common.presentToast('Login Failed.');
          }
          );
        })
        .catch(err => console.error(err));
    } else {
      this.webgooglelogin()
      .then(res => console.log(res))
      .catch(err => console.error(err));
    }

  }

  async  nativegooglelogin() {
      try {
        const gplusUser: any =  await this.googlePlus.login( {
          webClientId: '422524281155-7dnecfsmgq87v8dtdr2ds9ip9f4lct7u.apps.googleusercontent.com',
          offline: true,
          scopes: 'profile email' }
        );

        const dd: firebase.auth.OAuthCredential =  firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken);

        return await  this.afAuth.auth.signInWithCredential(dd);
      } catch (err) {
        console.log(err);
      }

  }

  async  webgooglelogin() {
    try {
     const provider =  new firebase.auth.GoogleAuthProvider();
     return await this.afAuth.auth.signInWithPopup(provider);

    } catch (err) {
      console.log(err);
    }

}
  async onSubmit($event) {
      const checkN = +$event.value.phone;
      if (isNaN(checkN)) {
              alert('Invalid Phone number');
              return;
      }

      await this.common.loadingPresent('Please wait..');
      this.AuthS.login($event.value.phone, $event.value.Password)
      .subscribe(
        async (RES: any) => {
            console.log(RES);
            await this.common.loadingDismiss();

            if (RES.Status) {
              const user =  new User();
              user.UserId =  RES.data.user_id;
              user.Email =  RES.data.email;
              user.Contact =  RES.data.phone_no;
              user.Name =  RES.data.name;
              this.AuthS.SaveLoginUser(user);

              this.nativeStorage.setItem('user' , user)
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
              this.saveFirebaseToken(user.UserId);
              this.router.navigate(['main']);

            } else {
             this.common.presentToast(RES.Mess);
            }
        },
        async (error) => {
          console.log(error);
          console.log(error.headers);
          console.log(error.error);
          await this.common.loadingDismiss();
          this.common.presentToast('Login Failed.');

        }
      );
      // this.AuthS.login($event.value.phone, $event.value.Password)
      // .then(data => {
      //   console.log(data);
      //   console.log(data.status);
      //   console.log(data.data); // data received by server
      //   console.log(data.headers);
      // })
      // .catch(error => {
      //   console.log(error);
      //  // console.log(error.error); // error message as string
      //  // console.log(error.headers);
      // });
  }
  async presentAlert(mess , mess2) {
    const alert = await this.alertController.create({
      header: mess2,
      subHeader: '',
      message: mess,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }



  async SIM(Email: string , Name: string) {
    console.log(Email);
    console.log(Name);
    const modal = await this.modalController.create({
      component: PhonenumberComponent,
      componentProps: {
        GoogleEmail: Email,
        GoogleName: Name
      }
    });
    return await modal.present();
  }

  saveFirebaseToken(userid) {
    try {
      this.fcm.getToken()
      .then(token => {
        // alert(token);
        this.AuthS.SaveToken(userid , token)
        .subscribe(
          (RES: any) => {
            if (RES.status) {
             // alert('Saved');
            } else {
             // alert(RES.Mess);
            }
          } ,
          (error) => {
           // alert('ERROR');
          }
        );
        console.log(token);
      });
    } catch (error) {
      alert('error 2');
    }
  }

}
