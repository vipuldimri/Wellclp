import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http: HttpClient ) { }

  getmyprescription(userid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const formData = new FormData();
    formData.append('user_id', userid);
    return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/auth/get_prescriptions.php',
    formData
    );
  }
}
