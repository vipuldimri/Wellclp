import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../services/prescription/prescription.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../main/common/imageViewer/imageViewer.component';

@Component({
  selector: 'app-my-prescription',
  templateUrl: './my-prescription.page.html',
  styleUrls: ['./my-prescription.page.scss']
})
export class MyPrescriptionPage implements OnInit {
  LogedInUser: User;
  list: [];
  constructor(private PresS: PrescriptionService,
              private AuthS: AuthService,
              public modalController: ModalController,
              private photoViewer: PhotoViewer) { }

  ngOnInit() {
      this.LogedInUser =  this.AuthS.GetLoginUser();
      this.GetMyPrescription();
  }

  GetMyPrescription() {
    this.PresS.getmyprescription(this.LogedInUser.UserId)
    .subscribe(
      (Data: any) => {
          console.log(Data);
          if (Data.Status) {
             this.list =  Data.data;
          }
      }
    );
  }

  async ViewPrescription(img) {
   //  this.photoViewer.show(img);
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        Images :  [img]
      }
    });
    await modal.present();
  }

  download(url: string) {
      // const url = 'http://www.example.com/file.pdf';
      const result = url.split('.');
      // alert(result[result.length - 1]);
  }


}
