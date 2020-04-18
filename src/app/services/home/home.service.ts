import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private http: HttpClient ) { }

get_slidshow() {
  return this.http.get('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/slidshow.php');
}

}
