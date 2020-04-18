import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { LoginPageModule } from '../login/login.module';
import { ChangePasswordComponent } from '../login/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    LoginPageModule
  ],
  declarations: [ProfilePage],
  entryComponents: [ChangePasswordComponent]
})
export class ProfilePageModule {}
