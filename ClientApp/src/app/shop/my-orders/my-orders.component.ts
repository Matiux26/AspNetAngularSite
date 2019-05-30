import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  ordersList: any;
  user: User;

  displayedColumns: string[] = ['user_info_id', 'payment_type', 'date', 'status', 'total'];
  dataSource: MatTableDataSource<Order>;
  productClicked = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productsList: any[];
  address: Object;
  orderItemsList: any;

  constructor(private _shopService: ShopService, private _authService: AuthService) {
    this.list = [];
    this.productsList = [];
    this.address = null;
    var userToken = this._authService.getDecodedToken();
    this._authService.getUser(userToken.id).subscribe((data: User) => {
      this.user = data;
      this._shopService.getOrdersByUserId(this.user.user_info_id).subscribe((data: Order[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.ordersList = data;
      });
    });
    this._shopService.getOrderItems().subscribe(data => {
      this.orderItemsList = data;
    });
  }

  ngOnInit() {
    this.productClicked = false;
  }
  list: any;

  showOrderInfo(e, id) {
    e.stopPropagation();
    var order;
    this.orderItemsList.forEach(element => {
      if (element.order_id == id) {
        this.list.push(element);
        this._shopService.getProduct(element.product_id).subscribe(data => {
          this.productsList.push(data);
        });
      }
    });
    this._shopService.getOrder(this.list[0].order_id).subscribe(data => {
      order = data;
      this._shopService.getDeliveryAddress(order.delivery_address_id).subscribe(data => {
        this.address = data;
      });
    });
    this.productClicked = true;
  }
  goBackToOrderList() {
    this.list = [];
    this.productsList = [];
    this.productClicked = false;
  }
}
