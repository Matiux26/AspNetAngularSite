import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/auth/auth.service';
import { SendEmailService } from 'src/app/send-email/send-email.service';

@Component({
  selector: 'app-awaiting-orders',
  templateUrl: './awaiting-orders.component.html',
  styleUrls: ['./awaiting-orders.component.css']
})
export class AwaitingOrdersComponent implements OnInit {
  orderItemsList: any;
  orderList: any;
  idOfOrders: any;
  productsList: any;
  usersList: any;
  address: any;

  displayedColumns: string[] = ['user_info_id', 'payment_type', 'date', 'status', 'total', 'other'];
  dataSource: MatTableDataSource<Order>;
  productClicked = false;
  role: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private _shopService: ShopService, private _authService: AuthService,
              private _sendEmailService: SendEmailService) {
    this.list = [];
    this.productsList = [];
    this.address = null;
  }

  ngOnInit() {
    this._shopService.getOrders().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.orderList = data;
    });
    this._shopService.getOrderItems().subscribe(data => {
      this.orderItemsList = data;
    });
    this.productClicked = false;
  }
  reload() {
    this._shopService.getOrders().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.orderList = data;
    });
  }
  orderSent(order) {
    var ans = confirm("Czy chcesz oznaczyć zamówienie o identyfikatorze: " + order.id + " jako wysłany");
    order.status = "wysłany";
    var email;
    email[0] = "testWebsiteEmail6765856856@gmail.com";
    email[1] = "Twoja przesylka zostala wyslana";
    email[2] = "status przesylki";
    if (ans) {
      this._shopService.updateOrder(order.id, order).subscribe((data) => {
        this.reload();
      }, error => console.error(error))
    }
    this._sendEmailService.sendEmail(email).subscribe();
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
