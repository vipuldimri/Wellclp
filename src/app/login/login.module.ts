import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { OTPComponent } from './otp/otp.component';
import { OTPSignUpComponent } from './otpSignUp/otpSignUp.component';
import { ProductsListPageModule } from '../products-list/products-list.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ProductsListPageModule
  ],
  declarations: [LoginPage , SignupComponent ,
    ChangePasswordComponent, PhonenumberComponent , OTPComponent , OTPSignUpComponent , ForgotPasswordComponent],
    entryComponents: [PhonenumberComponent , OTPComponent  , OTPSignUpComponent , ForgotPasswordComponent]
})
export class LoginPageModule {}
