import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  OPassword;
  NPassword;
  CPassword;
  constructor() { }

  ngOnInit() {}

  onSubmit($event) {
        console.log($event.value);
  }

}
