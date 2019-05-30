import { Component, OnInit, EventEmitter } from '@angular/core';
import { ShopService } from '../shop.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private _shopService: ShopService,
    private _authService: AuthService, private _snackBar: MatSnackBar,
    private _authGuardService: AuthGuardService, private router: Router,) {
    _shopService.onCartChange.subscribe(
      (amountToPay) => {
        this.amountToPay = amountToPay;
      }
    );
    _shopService.onOrderEvent.subscribe(
      () => {
        this.cartArray = null;
      }
    );
  }

  cartArray: any;
  amountToPay: number = 0;
  
  ngOnInit() {
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    if (this.cartArray != null) {
      this.cartArray.forEach(product => {
        this.amountToPay += product.price * product.quantity;
      });
    }
  }
  removeProductFromBasket(id) {
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    var filtered = this.cartArray.filter(function (product) {
      return product.id !== id;
    });
    localStorage.removeItem('itemsFromCartArray');
    localStorage.setItem('itemsFromCartArray', JSON.stringify(filtered));
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    this._shopService.onCartChange.emit(this.cartArray.length);
    if (this.cartArray != null) {
      this.cartArray.forEach(product => {
        this.amountToPay += product.price * product.quantity;
      });
    }
  }
  onQuantityChange(newValue, id) {
    if (this.cartArray != null) {
      this.cartArray.forEach(product => {
        if (parseInt(id) == parseInt(product.id)) {
          product.quantity = newValue;
        }
      });
    }
    localStorage.removeItem('itemsFromCartArray');
    localStorage.setItem('itemsFromCartArray', JSON.stringify(this.cartArray));
  }
  goToAddressForm(){
    this.router.navigate(['/shop/address']);
  }
}
