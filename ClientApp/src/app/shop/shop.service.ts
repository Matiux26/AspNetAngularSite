import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private product: Product;

  constructor(private http: HttpClient) { }

  onCartChange: EventEmitter<any> = new EventEmitter();
  onOrderEvent: EventEmitter<any> = new EventEmitter();

  getProducts() {
    return this.http.get('/api/products');
  }

  getProduct(id) {
    return this.http.get('/api/Products/' + id);
  }

  getOrdersByUserId(id) {
    return this.http.get('/api/OrdersByUserId/' + id);
  }

  addProduct(product) {
    return this.http.post('/api/Products', product);
  }

  deleteProduct(id) {
    return this.http.delete('/api/Products/' + id);
  }

  updateProduct(id, product) {
    return this.http.put('api/Products/' + id, product);
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
  getDeliveryAddresses() {
    return this.http.get('/api/Delivery_addresses');
  }

  getDeliveryAddress(id) {
    return this.http.get('/api/Delivery_addresses/' + id);
  }

  addDeliveryAddress(product) {
    return this.http.post('/api/Delivery_addresses', product);
  }

  deleteDeliveryAddress(id) {
    return this.http.delete('/api/Delivery_addresses/' + id);
  }

  updateDeliveryAddress(id, product) {
    return this.http.put('api/Delivery_addresses/' + id, product);
  }
  getOrderItem(id) {
    return this.http.get('/api/Order_items/' + id);
  }
  getOrderItems() {
    return this.http.get('/api/Order_items/');
  }
  getOrder(id) {
    return this.http.get('/api/Orders/' + id);
  }
  getOrders() {
    return this.http.get('/api/Orders/');
  }
  updateOrder(id, order) {
    return this.http.put('api/Orders/' + id, order);
  }
}
