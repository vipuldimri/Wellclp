import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, timer } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {


  BackButtonSub: Subscription;
  timersubscribe: Subscription;
  source = timer(0, 1000);
  PhoneNo;
  NPassword;
  CPassword;
  OTP;
  OTPVALUE;
  HashCode;
  TimerValue = 60;
  AllowResend =  true;
  smsTextmessage;
  constructor(public modalController: ModalController,
              private smsRetriever: SmsRetriever,
              private AuthS: AuthService) { }

  ngOnInit() {
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
      // this.SendOTP();
    })
    .catch((error: any) => console.error(error));
  }

  SendOTP() {
    this.TimerValue = 60;
    const checkN = +this.PhoneNo;
    if (isNaN(checkN)) {
            alert('Invalid Phone number');
            return;
    }

    if (this.PhoneNo.length !== 10) {
      alert('Invalid Phone number');
      return;
    }


    const OTP =  this.random4Digit() ;
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
        this.AllowResend =  false;

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
      } ,
      (error) => {
        console.log(error);
      }
    );



  }

  WatchSMS() {

    this.smsRetriever.startWatching()
    .then((res: any) => {
      this.smsTextmessage = res.Message;
      this.OTPVALUE =  this.smsTextmessage.substr(0 , 4);
      // console.log(res.Message);
      // alert(res.Message);
      this.timersubscribe.unsubscribe();
    })
    .catch((error: any) => {
      alert('ERROR');
      console.error(error);
      // this.WatchSMS();
    });

  }
  random4Digit() {
    return this.shuffle( '0123456789'.split('') ).join('').substring(0, 4);
  }
  shuffle(o) {
      // tslint:disable-next-line:curly
      for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  async onSubmit($event) {
    console.log($event.value);

    const checkN = +$event.value.PhoneNo;
    if (isNaN(checkN)) {
            alert('Invalid Phone number');
            return;
    }

    if ($event.value.PhoneNo.length !== 10) {
      alert('Invalid Phone number');
      return;
    }

    if ($event.value.CPassword !== $event.value.NPassword) {
      alert('Confirm password is different');
      return;
    }


    if (this.OTP !== $event.value.OTPVALUE) {
      alert('Invalid OTP');
      return;
    }

    const formData = new FormData();
    formData.append('newpassword', $event.value.CPassword);
    formData.append('phone', $event.value.PhoneNo);

    this.AuthS.Forgotpassword(formData)
    .subscribe(
      (RES: any) => {
          if (RES.Status) {
            alert('Password changed successfully, nevigating to login screen');
            $event.reset();
            this.Dismiss();
          } else {
            alert(RES.Mess);
          }
      },
      (Error) => {
        alert('Something went wrong.');
      }
    );

  }

  Dismiss() {
    if (this.timersubscribe) {
      this.timersubscribe.unsubscribe();
    }
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    if (this.timersubscribe) {
      this.timersubscribe.unsubscribe();
    }
    this.BackButtonSub.unsubscribe();
    this.modalController.dismiss();
  }

}
