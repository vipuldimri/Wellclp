import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

Lat;
Lon;
displayAddress;
completeAddress;


constructor(private geolocation: Geolocation , private http: HttpClient) {}


GetLocation() {
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    console.log(resp);
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  //  let watch = this.geolocation.watchPosition();
  //  watch.subscribe((data) => {
  //   // data can be a set of coordinates, or an error (if an error occurred).
  //   // data.coords.latitude
  //   // data.coords.longitude
  //  });
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
