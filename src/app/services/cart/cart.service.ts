
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL = environment.baseURL;
  private ProductsList = [];
  public cartCountsubject;
  public cartItemsubject;
  constructor(private http: HttpClient) {
  this.cartCountsubject = new Subject<number>();
  this.cartItemsubject = new Subject<boolean>();
 }

GetCount(): number {
    return this.ProductsList.length;
}

GetProducts() {
  return this.ProductsList;
}

AddProduct(cartobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.post( this.baseURL +  '/api/Home/addtocart.php',
  cartobj
  );
}

Removeproduct(index) {
  if (index > -1) {
    this.ProductsList.splice(index, 1);
  }
  this.cartItemsubject.next(true);
  this.cartCountsubject.next(this.ProductsList.length);
}

Clearcart() {
  this.ProductsList = [];
  this.cartCountsubject.next(this.ProductsList.length);
  this.cartItemsubject.next(true);
}


GetCart(cartobj) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  return this.http.post(this.baseURL +  '/api/Home/getcart.php',
  cartobj
  );
}

}
