import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private http: HttpClient ) { }
baseURL = 'http://localhost/API';
get_slidshow() {
  return this.http.get( this.baseURL +  '/api/Home/slidshow.php');
}

}
