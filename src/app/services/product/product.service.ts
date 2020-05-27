import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient ) { }
baseURL = environment.baseURL;

GetHomeList() {
  return this.http.get( this.baseURL +  '/api/Home/home.php');
}

ProductSearch(searchkey) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('key', searchkey);

  return this.http.post(this.baseURL +  '/api/Home/searchproduct.php',
      formData
  );
}

GetProductDetails(productid) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('key', productid);


  return this.http.post( this.baseURL +  '/api/Home/sproductdetails.php',
  formData
  );
}

GetProductList(categoryid , option , startindex) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('Category_Id', categoryid);
  formData.append('Option', option);
  formData.append('StartIndex', startindex);

  return this.http.post( this.baseURL +  '/Home/sproductlisting.php',
  formData
  );
}


GetProductTypes() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.get(this.baseURL +  '/Extra/getproducttypes.php');
}

GetProductBrands() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.get(this.baseURL +  '/Extra/getproductbrands.php');
}


}
