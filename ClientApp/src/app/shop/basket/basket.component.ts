import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { OrderSimplified } from '../../models/order-simplified';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private _shopService: ShopService,
    private _authService: AuthService) { }

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
  orderItemsInBasket() {
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
  }
}
