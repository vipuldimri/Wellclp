import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { CommonProviderService } from '../services/CommonProvider.service';
import { User } from '../services/auth/user.model';
import { AuthService } from '../services/auth/auth.service';
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
  doctname = '';
  patientname = '';
  // tslint:disable-next-line:max-line-length
  Images = [ ];
  LogedInUser: User;
  constructor(private camera: Camera,
              private CommonS: CommonProviderService,
              private webview: WebView,
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
    // const func = createNewFileEntry;

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // this.IMG2 = 'data:image/jpeg;base64,' + imageData;

      // this.IMG2 =  this.pathForImage(this.file.dataDirectory + imageData.substr(0, imageData.lastIndexOf('/') + 1));
      // this.IMG = this.pathForImage(this.file.dataDirectory + imageData.substr(0, imageData.lastIndexOf('/') + 1));
      // this.IMG3 = imageData.substr(0, imageData.lastIndexOf('/') + 1);
       this.IMG2 = 'data:image/jpeg;base64,' + imageData;
       this.data =  imageData;
       this.Images.push(this.pathForImage(imageData));
       this.I = true;
     }, (err) => {
      // Handle error
     });


  }
  Galary() {
    this.openFilePicker();
  }

   openFilePicker() {

    const srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options = this.setOptions(srcType);
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.Images.push(this.pathForImage(imageData));
     }, (err) => {
      // Handle error
     });
}

   setOptions(srcType) {
    const options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
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
          // error
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
      formData.append('doctor_name', 'd');
      formData.append('patient_name', 'p');

      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

uploadImageData(formData: FormData) {
  this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/upload_prescription.php', formData)
  .subscribe((data: any) => {
          if (data.Status) {
            this.CommonS.presentToast('Prescription uploded successfully.');

          } else  {
            this.CommonS.presentToast(data.Mess);
          }
  },
  (error) => {
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

removepic() {
  this.Images = [];
}

Picclick(img) {
   // alert(img);
  // this.photoViewer.show(this.IMG2);
  this.ShowIMG = true;
}

}
