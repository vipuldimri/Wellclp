import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {}

  onSubmit($event) {
    console.log($event.value);

    const checkN = +$event.value.PhoneNumber;
    if (isNaN(checkN)) {
            alert('Invalid Phone number');
            return;
    }
  // name: "asd"
  // Email: "9718327876@a"
  // PhoneNumber: "7777777777"
  // Password: "dddddddd"
  // Terms: true
  }

}
