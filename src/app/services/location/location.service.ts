import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { CommonProviderService } from '../CommonProvider.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

Lat;
Lon;
displayAddress;
completeAddress;
Location: NativeGeocoderResult;

constructor(private geolocation: Geolocation ,
            private http: HttpClient,
            private nativeGeocoder: NativeGeocoder,
            private commonP: CommonProviderService) {}


  async GetLocation() {
//  if (!this.Location) {
//     return 'Location not set';
//  }

 await this.RefreshLocation();
 this.commonP.presentToast( 'Your location  ' + this.Location.postalCode + ' ' + this.Location.subLocality + ' ' + this.Location.locality);
 return this.Location.postalCode + ' ' + this.Location.subLocality + ' ' + this.Location.locality;
}
  async RefreshLocation() {
    await this.geolocation.getCurrentPosition().then(async (resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    console.log(resp.coords.latitude);
    console.log(resp.coords.longitude);

    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    await this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      // alert(JSON.stringify(result[0]));
      this.Location =  result[0];
    })
    .catch((error: any) => console.log(error));

   }).catch((error) => {
     console.log('Error getting location', error);
   });

}
GetUserAddresses(userid) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('user_id', userid);
  return this.http
  .post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/getuseraddress.php',
    formData
  );

}

}
