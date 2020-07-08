import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OTPSignUpComponent } from '../otpSignUp/otpSignUp.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  Name = '';
  Email = '';
  Mobile = '';
  Password = '';
  TermsChecked  = false;
  sub: Subscription;
  constructor(private AuthS: AuthService, private router: Router,
              private route: ActivatedRoute,
              public modalController: ModalController) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        // tslint:disable-next-line:no-string-literal
        this.Mobile = params['Phone'] || 0;
      });
  }

  async onSubmit($event) {
    console.log($event.value);

    const checkN = +$event.value.PhoneNumber;
    if (isNaN(checkN)) {
            alert('Invalid Phone number');
            return;
    }

    if ($event.value.PhoneNumber.length !== 10) {
      alert('Invalid Phone number');
      return;
    }

    const formData = new FormData();
    formData.append('email', $event.value.Email);
    formData.append('mobile', $event.value.PhoneNumber);
    formData.append('name', $event.value.name);
    formData.append('password', $event.value.Password);


    const modal = await this.modalController.create({
      component: OTPSignUpComponent,
      componentProps: {
        FormObj: formData,
        PhoneNo:  $event.value.PhoneNumber
      }
    });
    return await modal.present();

    // this.AuthS.SignUp(formData)
    // .subscribe(
    //   (RES: any) => {
    //     if (RES.Status) {
    //       alert('Registeration Successfull, Please login now.');
    //       this.router.navigate(['/login']);
    //     } else {
    //         alert(RES.Mess);
    //     }
    //   },
    //   (Error) => {
    //     alert('Oops, something went wrong.');
    //   }
    // );

  }

}
