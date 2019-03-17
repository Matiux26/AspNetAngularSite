import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { OrderSimplified } from '../../models/order-simplified';
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
    private _authGuardService: AuthGuardService) {
    _shopService.onCartChange.subscribe(
      (amountToPay) => {
        this.amountToPay = amountToPay;
      }
    );
  }

  cartArray: any;
  amountToPay: number = 0;
  order: OrderSimplified;

  ngOnInit() {
    //console.log(new Date());
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    if (this.cartArray != null) {
      this.cartArray.forEach(product => {
        this.amountToPay += product.price * product.quantity;
      });
    }
  }
  removeProductFromBasket(id) {
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    console.log(this.cartArray);
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
  orderItemsInBasket() {
    console.log(this._authGuardService.checkIfLoggedIn());
    if (this._authGuardService.checkIfLoggedIn() == true) {
      var decodedToken = this._authService.getDecodedToken();
      this.order = new OrderSimplified();
      this.order.date = formatDate(new Date(), 'yyyy/MM/dd', 'en');//jak cos moze nie dzialac to to bo jak sie na sztywno wpisze date to dziala
      this.order.user_id = parseInt(decodedToken.id);
      this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
      if (this.cartArray != null) {
        this.cartArray.forEach(product => {
          this.order.product_id = parseInt(product.id);
          this.order.quantity = parseInt(product.quantity);
          this._shopService.addSimplifiedOrderItem(this.order).subscribe(
            response => {
              return true;
            }
          )
        });
      }
      localStorage.removeItem('itemsFromCartArray');
      let snackBarRef = this._snackBar.open('Sucessfully Ordered', 'Undo');
    }else{
      let snackBarRef = this._snackBar.open('You need to be logged in', 'Undo');
    }
  }
}
