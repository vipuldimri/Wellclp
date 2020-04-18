
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/addtocart.php',
   cartobj , httpOptions
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


  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/getcart.php',
  cartobj
  );
}

}
