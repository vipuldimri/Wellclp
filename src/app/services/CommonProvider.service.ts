import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonProviderService {
  ModelsID = [];
  loading;
  BackButtonSub: Subscription[] = [];
  constructor(private loadingController: LoadingController,
              public toastController: ToastController,
              public http: HttpClient
              ) { }

  async loadingPresent(message: string = null, duration: number = null) {
      this.loading = await this.loadingController.create({ message, duration });
      await this.loading.present();
  }

  async loadingDismiss() {
    await   this.loading.dismiss();
  }

  async presentToast(mss) {
    const toast = await this.toastController.create({
      message: mss,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }


  SaveModel(id) {
    this.ModelsID.push(id);
  }

  GetAllActiveModels() {
    return this.ModelsID;
  }

  GetMyNotifications(userid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const formData = new FormData();
    formData.append('user_id', userid);


    return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/getnotifications.php',
    formData
    );
  }


  AddSubcribeBack(Subobj) {
      this.BackButtonSub.push(Subobj);
  }

  RemoveUnSubcribeBack() {
    this.BackButtonSub.forEach(element => {
      element.unsubscribe();
    });
  }

}
