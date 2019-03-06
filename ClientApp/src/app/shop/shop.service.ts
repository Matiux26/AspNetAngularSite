import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private product: Product;
  
  constructor(private http: HttpClient) { }

  onAddToCartEvent: EventEmitter<any> = new EventEmitter();

  getProducts() {
    return this.http.get('/api/products');
  }

  getProduct(id) {
    return this.http.get('/api/Products/' + id);
  }

  addProduct(product) {
    return this.http.post('/api/Products', product);
  }

  deleteProduct(product) {
    return this.http.delete('/api/Products/' + product.id);
  }

  addOrder(order) {
    return this.http.post('/api/Orders', order);
  }

  addOrderItem(orderItem) {
    return this.http.post('/api/Order_items', orderItem);
  }

  addSimplifiedOrderItem(order) {
    return this.http.post('/api/OrderSimplifieds', order);
  }

}
