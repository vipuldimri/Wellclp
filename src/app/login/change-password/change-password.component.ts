import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  OPassword;
  NPassword;
  CPassword;
  LogedInUser: User;
  constructor(private authS: AuthService) { }

  ngOnInit() {
    this.LogedInUser = this.authS.GetLoginUser();
  }

  onSubmit($event) {
        console.log($event.value);
        if (this.CPassword !== this.NPassword) {
          alert('Password mismatch.');
          return;
        }

        if (!this.NPassword) {
          alert('Invalid password.');
          return;
        }

        if (this.NPassword.length < 6) {
          alert('Invalid password, Password should be min 6 characters.');
          return;
        }

        const formData = new FormData();
        formData.append('user_id', this.LogedInUser.UserId + '');
        formData.append('oldpassword', this.OPassword);
        formData.append('newpassword', this.NPassword);


        this.authS.ChangePassword(formData)
        .subscribe(
          (RES: any) => {
              if (RES.Status) {
                alert('Password changed successfully.');
                $event.reset();
              } else {
                alert(RES.Mess);
              }
          },
          (Error) => {
            alert('Something went wrong.');
          }
        );
  }
}
