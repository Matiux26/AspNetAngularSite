import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { formatDate } from '@angular/common';
import { UserDetails } from '../../models/user-details';
import { ShopService } from '../shop.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { OrderItems } from 'src/app/models/orderItems';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  orderItems: OrderItems;
  userDetails: UserDetails;
  order: Order;
  total: number;
  cartArray: any;
  user: any;
  number: number;
  token: any;

  constructor(private _shopService: ShopService,
    private _authService: AuthService, private _snackBar: MatSnackBar) {
    this.order = new Order();
    this.orderItems = new OrderItems();
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('addressInfo'));
    this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
    this.token = this._authService.getDecodedToken();
    this.total = 0;
    if (this.cartArray != null) {
      this.cartArray.forEach(product => {
        this.total += product.price * product.quantity;
      });
    }
  }

  Ord() {
    const a$ = this._authService.getUser(this.token.id);
    const b$ = this._shopService.addDeliveryAddress(this.userDetails);
    const x$ = forkJoin(a$, b$);

    x$.pipe(
      switchMap(responseList => {
        this.user = responseList[0];

        this.order.payment_type = "karta";
        this.order.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.order.date = this.order.date.toString();
        this.order.status = "oczekujace";
        this.order.delivery_address_id = this.number;
        this.order.delivery_address_id = responseList[1]["id"];
        this.order.user_info_id = this.user.user_info_id;
        this.order.total = this.total;
        return this._shopService.addOrder(this.order);
      })
    ).subscribe(res => {
      this.orderItems.order_id = res["id"];
      this.cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray'));
      if (this.cartArray != null) {
        this.cartArray.forEach(product => {
          this.orderItems.product_id = parseInt(product.id);
          this.orderItems.quantity = parseInt(product.quantity);
          this._shopService.addOrderItem(this.orderItems).subscribe(
            () => {
              return true;
            })
        });
      }
      localStorage.removeItem('itemsFromCartArray');
      this._snackBar.open('Sucessfully Ordered', 'X');
      this._shopService.onOrderEvent.emit();
    });
  }
}
