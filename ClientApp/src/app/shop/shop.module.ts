import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule, MatTableModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SummaryComponent } from './summary/summary.component';
import { AwaitingOrdersComponent } from './awaiting-orders/awaiting-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [ProductsComponent, BasketComponent, AddProductComponent, OrderDetailsComponent, SummaryComponent, AwaitingOrdersComponent, MyOrdersComponent]
})
export class ShopModule { }
