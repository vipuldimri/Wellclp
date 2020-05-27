import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { SmsRetriever  } from '@ionic-native/sms-retriever/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonProviderService } from 'src/app/services/CommonProvider.service';
import { User } from 'src/app/services/auth/user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit, OnDestroy {
  BackButtonSub: Subscription;
  smsTextmessage = '';
  OTP = 'TEST';
  OTPVALUE = '';

  @Input() GoogleEmail: string;
  @Input() GoogleName: string;
  @Input() PhoneNo: string;

  constructor(public modalController: ModalController,
              private smsRetriever: SmsRetriever,
              private AuthS: AuthService,
              private common: CommonProviderService,
              private nativeStorage: NativeStorage,
              private router: Router,
              private fcm: FCM) { }

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.Dismiss();
    });

    this.smsRetriever.getAppHash()
    .then((res: any) => {
      console.log(res);
      // alert(res);
    })
    .catch((error: any) => console.error(error));

    // this.WatchSMS();
    this.SendOTP();
  }

  SendOTP() {
    const OTP =  this.random4Digit() ;
    // alert(OTP);
    this.OTP =  OTP;

    const formData = new FormData();
    formData.append('register_mobile', this.PhoneNo);
    formData.append('OTP', this.OTP);

    this.AuthS.SendOTP(formData)
    .subscribe();

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
      console.log(res);
      alert(res);
    })
    .catch((error: any) => {
      alert('ERROR');
      console.error(error);
      this.WatchSMS();
    });

  }

  Dismiss() {
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }
 ngOnDestroy(): void {
  this.BackButtonSub.unsubscribe();
}
  async VerifyOTP() {


    if (this.OTP !== this.OTPVALUE) {
        alert('Invalid OTP');
        return;
    }

    console.log(this.GoogleName);
    console.log(this.GoogleEmail);
    console.log(this.PhoneNo);
    const formData = new FormData();
    formData.append('register_name', this.GoogleName);
    formData.append('register_email', this.GoogleEmail);
    formData.append('register_mobile', this.PhoneNo);

    await this.common.loadingPresent('Please wait..');
    this.AuthS.GoogleRegisteration(formData)
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
}

saveFirebaseToken(userid) {
  try {
    this.fcm.getToken().then(token => {
      this.AuthS.SaveToken(userid , token)
      .subscribe();
      console.log(token);
    });
  } catch (error) {
    alert('error 2');
  }
}

}
