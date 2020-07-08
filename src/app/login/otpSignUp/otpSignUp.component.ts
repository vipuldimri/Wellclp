import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription, timer } from 'rxjs';
import { SmsRetriever  } from '@ionic-native/sms-retriever/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonProviderService } from 'src/app/services/CommonProvider.service';
import { User } from 'src/app/services/auth/user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-otp',
  templateUrl: './otpSignUp.component.html',
  styleUrls: ['./otpSignUp.component.scss']
})
export class OTPSignUpComponent implements OnInit, OnDestroy {
  BackButtonSub: Subscription;
  smsTextmessage = '';
  OTP = 'TEST';
  OTPVALUE = '';

  TimerValue = 60;
  AllowResend =  false;
  HashCode = '';
  @Input() FormObj;
  @Input() PhoneNo;
  @Input() User: User;
  @Input() IsLogin;
  source = timer(0, 1000);
  timersubscribe;
  constructor(public modalController: ModalController,
              private smsRetriever: SmsRetriever,
              private AuthS: AuthService,
              private common: CommonProviderService,
              private nativeStorage: NativeStorage,
              private router: Router,
              private fcm: FCM) { }

  ngOnInit() {

    console.log(this.FormObj);

    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });


    this.smsRetriever.getAppHash()
    .then((res: any) => {
      console.log('code');
      console.log(res);

      this.HashCode =  res;
      this.WatchSMS();
      this.SendOTP();
      // alert(res);
    })
    .catch((error: any) => console.error(error));
  }

  SendOTP() {
    const OTP =  this.random4Digit() ;
    // alert(OTP);
    this.OTP =  OTP;

    const formData = new FormData();
    formData.append('OTP', this.OTP);
    formData.append('HashCode', this.HashCode);

    if (this.IsLogin === true) {
      this.PhoneNo =  this.User.Contact;
      formData.append('register_mobile', this.User.Contact + '');
    } else {
      formData.append('register_mobile', this.PhoneNo);
    }


    console.log(this.PhoneNo);
    console.log(this.OTP);

    this.AuthS.SendOTP(formData)
    .subscribe(
      (RES: any) => {
        console.log(RES);
      } ,
      (error) => {
        console.log(error);
      }
    );

    this.timersubscribe = this.source
    .subscribe(val => {
       console.log(val);
       this.TimerValue--;
       if (this.TimerValue === 0) {
        this.timersubscribe.unsubscribe();
        this.AllowResend =  true;
       }
     }
      );

  }

  async Login(user) {
             this.AuthS.SaveLoginUser(user);

             try {
                await this.nativeStorage.setItem('user' , user);
              } catch (err) {
                console.error('Error storing item', err);
              }

             this.saveFirebaseToken(user.UserId);
             this.router.navigate(['main']);

             this.Dismiss();
  }

  SendAgain() {

    this.SendOTP();
    return;
    const OTP =  this.random4Digit() ;
    // alert(OTP);
    this.OTP =  OTP;

    const formData = new FormData();
    formData.append('register_mobile', this.PhoneNo);
    formData.append('OTP', this.OTP);
    formData.append('HashCode', this.HashCode);

    console.log(this.PhoneNo);
    console.log(this.OTP);

    this.AuthS.SendOTP(formData)
    .subscribe(
      (RES: any) => {
        console.log(RES);
      } ,
      (error) => {
        console.log(error);
      }
    );

    this.AllowResend =  false;

    this.timersubscribe = this.source
    .subscribe(val => {
       // console.log(val);
       this.TimerValue--;
       if (this.TimerValue === 0) {
        this.timersubscribe.unsubscribe();
        this.AllowResend =  true;
       }
     }
      );
  }

  random4Digit() {
    return this.shuffle( '0123456789'.split('') ).join('').substring(0, 4);
  }
  shuffle(o) {
      // tslint:disable-next-line:curly
      for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }


  WatchSMS() {

    this.smsRetriever.startWatching()
    .then((res: any) => {
      this.smsTextmessage = res.Message;
      this.OTPVALUE =  this.smsTextmessage.substr(0 , 4);
      // console.log(res.Message);
      // alert(res.Message);
    })
    .catch((error: any) => {
      // alert('ERROR');
      console.error(error);
      // this.WatchSMS();
    });

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

  Dismiss() {
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }
 ngOnDestroy(): void {
  this.timersubscribe.unsubscribe();
  this.BackButtonSub.unsubscribe();
}
  async VerifyOTP() {
    if (this.OTP !== this.OTPVALUE) {
        alert('Invalid OTP');
        return;
    }

    if (this.IsLogin) {

          this.Login(this.User);

    } else {
        this.AuthS.SignUp(this.FormObj)
        .subscribe(
          (RES: any) => {
            if (RES.Status) {
              alert('Registeration Successfull.');
              // this.modalController.dismiss();
              // this.router.navigate(['/login']);

              const user =  new User();
              user.UserId =  RES.data.user_id;
              user.Email =  RES.data.email;
              user.Contact =  RES.data.phone_no;
              user.Name =  RES.data.name;

              this.Login(user);

            } else {
                alert(RES.Mess);
            }
          },
          (Error) => {
            alert('Oops, something went wrong.');
          }
        );
    }
}
}
