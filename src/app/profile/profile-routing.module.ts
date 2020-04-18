import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ChangePasswordComponent } from '../login/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
