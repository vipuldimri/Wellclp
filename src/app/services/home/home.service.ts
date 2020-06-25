import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
baseURL = environment.baseURL;
constructor(private http: HttpClient ) { }
get_slidshow() {
  return this.http.get( this.baseURL +  '/api/Home/slidshow.php');
}

}
