import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient ) { }

GetHomeList() {
  return this.http.get('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/home.php');
}

ProductSearch(searchkey) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const formData = new FormData();
  formData.append('key', searchkey);

  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/searchproduct.php',
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


  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/sproductdetails.php',
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

  return this.http.post('http://www.wellclap.com/vaibhavapp/ionicapp/api/Home/sproductlisting.php',
  formData
  );
}


GetProductTypes() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.get('http://www.wellclap.com/vaibhavapp/ionicapp/api/Extra/getproducttypes.php');
}

GetProductBrands() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.get('http://www.wellclap.com/vaibhavapp/ionicapp/api/Extra/getproductbrands.php');
}


}
