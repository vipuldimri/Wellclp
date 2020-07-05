import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { CommonProviderService } from '../services/CommonProvider.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { OTPComponent } from '../login/otp/otp.component';
import { DoneComponent } from '../Common/done/done.component';
@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.page.html',
  styleUrls: ['./upload-prescription.page.scss'],
  providers: [Camera ,   File,  WebView ]
})
export class UploadPrescriptionPage implements OnInit {
  I = false;
  IMG2;
  ShowIMG = false;
  data;
  DoctorName = '';
  PatientName = '';
  // tslint:disable-next-line:max-line-length
  Images = [ ];
  LogedInUser: User;
  constructor(private camera: Camera,
              private CommonS: CommonProviderService,
              private webview: WebView,
              public modalController: ModalController,
              private http: HttpClient,
              private AuthS: AuthService,
              private photoViewer: PhotoViewer,
              private file: File) { }

  ngOnInit() {
    this.LogedInUser =  this.AuthS.GetLoginUser();
  }

  CameraClick() {

    const srcType = this.camera.PictureSourceType.CAMERA;
    const options = this.setOptions(srcType);
    this.camera.getPicture(options).then((imageData) => {
       this.IMG2 = 'data:image/jpeg;base64,' + imageData;
       this.data =  imageData;
       this.Images.push(this.pathForImage(imageData));
       this.I = true;
     }, (err) => {
     });


  }
  Galary() {
    this.openFilePicker();
  }

   openFilePicker() {

    const srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options = this.setOptions(srcType);
    this.camera.getPicture(options).then((imageData) => {
      this.Images.push(this.pathForImage(imageData));
     }, (err) => {
     });
}

   setOptions(srcType) {
    const options = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
    return options;
}
pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    const converted = this.webview.convertFileSrc(img);
    return converted;
  }
}

startUpload(path) {
  this.file.resolveLocalFilesystemUrl(path)
      .then(entry => {
          // tslint:disable-next-line:no-angle-bracket-type-assertion
          ( < FileEntry > entry).file(file => this.readFile(file));
      })
      .catch(err => {
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('image', imgBlob, file.name);
      formData.append('user_id', this.LogedInUser.UserId + '' );
      formData.append('doctor_name', this.DoctorName);
      formData.append('patient_name', this.PatientName);

      if (!this.DoctorName || this.DoctorName.length <= 3 ) {
        alert('Provide doctor name');
        return;
      }

      if (!this.PatientName || this.PatientName.length <= 3 ) {
        alert('Provide patient name');
        return;
      }

      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

  async uploadImageData(formData: FormData) {
  await this.CommonS.loadingPresent('Please wait..');
  this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/upload_prescription.php', formData)
  .subscribe(async (data: any) => {
          await this.CommonS.loadingDismiss();
          if (data.Status) {
            this.CommonS.presentToast('Prescription uploded successfully.');
            this.DoctorName = '';
            this.PatientName = '';
            this.CommonS.presentToast('Our Executive will contact you shortly.');
            this.ShowSuccess();

          } else  {
            this.CommonS.presentToast(data.Mess);
          }
  },
  async (error) => {
    await this.CommonS.loadingDismiss();
    console.log(error);
    this.CommonS.presentToast('Opps , Something went wrong.');
  });

}

Upload_prescription() {



  if (!this.data) {
      this.CommonS.presentToast('Please upload picture');
      return;
  }
  this.startUpload(this.data);
}

  async ShowSuccess() {
  const modal = await this.modalController.create({
    component: DoneComponent,
    componentProps: {
      Message: 'Thanks for uploding Prescription , Our Executive will contact you shortly.'
    }
  });
  await modal.present();
}

removepic() {
  this.Images = [];
}

Picclick(img) {
   // alert(img);
  // this.photoViewer.show(this.IMG2);
  this.ShowIMG = true;
}

}
