import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModuleComponent } from './CommonModule.component';
import { DoneComponent } from '../done/done.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [CommonModuleComponent],
})
export class CommonModuleModule { }
