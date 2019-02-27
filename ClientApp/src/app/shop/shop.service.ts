import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private product: Product;
  
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('/api/products');
  }

  getProduct(id) {
    return this.http.get('/api/Products/' + id);
  }

  addProduct(product) {
    //let body = JSON.stringify(product);
    return this.http.post('/api/Products', product);
  }

  deleteProduct(product) {
    return this.http.delete('/api/Products/' + product.id);
  }
}
