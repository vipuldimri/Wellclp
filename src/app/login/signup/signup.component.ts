import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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
  constructor(private AuthS: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit($event) {
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

    this.AuthS.SignUp(formData)
    .subscribe(
      (RES: any) => {
        if (RES.Status) {
          alert('Registeration Successfull, Please login now.');
          this.router.navigate(['/login']);
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
